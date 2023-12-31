import InputGroup from "react-bootstrap/InputGroup";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { Device } from "@twilio/voice-sdk";
import Navbar from "../Components/Navbar";
import axios from "axios";

const CallingTwilio = () => {
  const [inputNumber, setInputNumber] = useState("");
  const [varDevice, setVarDevice] = useState("");
  const [callObject, setCallObject] = useState('');
  const [cutFalg, setCutFlag] = useState(false)
  const [callAccept, setCallAccept] = useState(false);
  const [callRjected, setCallRejected] = useState(false);
  const [callState, setCallState] = useState(null);
  const [addCall, setAddCall] = useState("");
  const [callBtnDisable, setCallBtnDisable] = useState(false);
  const [callStatus, setCallStatus] = useState(null);
  useEffect(() => {
    setupClientForCall();
  }, []);

  const handleCallPress = async (e) => {
    e.preventDefault();
    makeOutgoingCall(inputNumber, varDevice);
  };
  const handleInput = (e) => {
    const inputPhoneNumber = e.target.value;
    setInputNumber(inputPhoneNumber);
  };

  function sendVoiceCall(phoneNumber) {
    const url = "https://0636-49-249-141-190.ngrok-free.app/api/call/voice";
    const data = {
      To: phoneNumber,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("response of sendVoiceCall", response);
        if (response.ok) {
          console.log("Voice call sent successfully!");
        } else {
          throw new Error("Failed to send voice call.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const makeOutgoingCall = async (phoneNumber, varDevice) => {
    var params = {
      To: phoneNumber,
    };

    if (varDevice) {
      console.log(`Attempting to call ${params.To} ...`);
      const call = await varDevice.connect({ params });
      setCallObject(call)
      setCallState('ReadyToCall');
      console.log("call obj", call);
      console.log(call.on, "call.on");
      call.on("error", (err) => {
        console.log("CALL ERROR OCCURED", err);
      });
      call.on("accept", () => {
        // sendVoiceCall(phoneNumber);
        setCallAccept(true);
        setCallState('Connected');
        setCallBtnDisable(true)
        console.log("CALL IS OPEN");
      });
      call.on("disconnect", () => {
        setCallState('Close');
        setCallBtnDisable(false)
        console.log("CALL DISCONNECTED");
      });
      call.on("cancel", () => {
        setCallRejected(true);
        setCallBtnDisable(false)
        setCallState('Rejected');
        console.log("CALL REJECTED");
      });
      if (cutFalg) {
        call.disconnect()
      }

    } else {
      console.log("Unable to make call.");
    }

    // TODO: Make it so that hangup button can work
    // outgoingCallHangupButton.onclick = () => {
    //   log("Hanging up ...");
    //   call.disconnect();
    // };
  };

  const setupClientForCall = async () => {
    console.log("Requesting Access Token...");
    // TODO: fetch token from server
    try {
      const response = await axios.get(
        "http://localhost:3008/call/generate-token",
        {}
      );
      const token = response.data.data.token;
      console.log("response.status", response.status);
      intitializeDevice(token);
      console.log(token);
    } catch (err) {
      console.log(err);
    }
  };

  const intitializeDevice = (token) => {
    try {
      console.log("Initializing device");
      let device = new Device(token, {
        logLevel: 1,
        codecPreferences: ["opus", "pcmu"],
      });
      setVarDevice(device);
      addDeviceListeners(device);
      device.register();
    } catch (err) {
      console.log("intitializeDevice ERR", err);
    }
  };

  const addDeviceListeners = (device) => {
    console.log("device", device);
    device.on("registered", () => {
      console.log("Twilio.Device Ready to make and receive calls!");
    });

    device.on("error", (error) => {
      console.log("Twilio.Device Error: " + error.message);
    });

    device.on("incoming", handleIncomingCall);
    device.on('connection.accepted', (connection) => {
      setAddCall("connected")
    });

    device.on('connection.disconnect', (connection) => {
      setAddCall("call disconnected")
    });

    device.on('connection.error', (connection) => {
      setAddCall("call error")
    });
  };

  // HANDLE INCOMING CALL

  const handleIncomingCall = (call) => {
    console.log(`Incoming call from ${call.parameters.From}`);
  };

  // ACCEPT INCOMING CALL

  function acceptIncomingCall(call) {
    call.accept();
    console.log("Accepted incoming call.");
  }

  // REJECT INCOMING CALL

  function rejectIncomingCall(call) {
    call.reject();
    console.log("Rejected incoming call");
  }

  // HANG UP INCOMING CALL

  function hangupIncomingCall(call) {
    call.disconnect();
    console.log("Hanging up incoming call");
  }

  // HANDLE CANCELLED INCOMING CALL

  function handleDisconnectedIncomingCall() {
    console.log("Incoming call ended.");
  }

  // HANG UP INCOMING CALL
  const cutCall = () => {
    callObject.disconnect();
    console.log("Hanging up incoming call");
  }
  // ACCEPT INCOMING CALL
  const acceptCall = () => {
    callObject.accept();
    console.log("Accepted incoming call.");
  }
  // REJECT INCOMING CALL
  const rejectCall = () => {
    callObject.reject();
    console.log("Rejected incoming call");
  }
  // if (callObject) {
  //   let statusOfCall = callObject.status();
  //   console.log(statusOfCall, "****status");
  // }
  // useEffect(() => {
  //   if (callObject) {
  //     console.log('test call')
  //     let statusOfCall = callObject.status();
  //     setCallState(statusOfCall);
  //     console.log(statusOfCall, "****status");
  //   }
  //   console.log({ callObject });
  // })
  useEffect(() => {
    if (callObject) {
      let callStates = callObject.status();
      setCallStatus(callStates);
      console.log(callStates, "++++++++++++++");
    }
  })
  return (
    <>
      <Navbar />
      <div className="col-md-6">
        <Card className="text-center">
          <Card.Header>Twilio Voice JavaScript SDK Quickstart</Card.Header>
          <Card.Body>
            <Card.Title>Make a Call</Card.Title>
            <Card.Text>Enter a phone number or client name</Card.Text>
            <form onSubmit={handleCallPress}>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Enter phone number"
                  name="phone"
                  type="number"
                  value={inputNumber}
                  onChange={handleInput}
                  maxLength="12"
                  minLength="10"
                  required
                />
              </InputGroup>
              <div>
                <h3>{callState}</h3>
                <h3>{callStatus}</h3>
              </div>
              <Button variant="primary" type="submit" disabled={callBtnDisable}>
                Call
              </Button>
              <Button variant="danger" onClick={() => (cutCall())} className="ms-2">
                Cut
              </Button>
              {/* <Button variant="success" onClick={() => (acceptCall())} className="ms-2">
                Accept
              </Button> */}
              {/* <Button variant="warning" onClick={() => (rejectCall())} className="ms-2">
                Reject
              </Button> */}
            </form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
export default CallingTwilio;

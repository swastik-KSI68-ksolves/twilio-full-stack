import Twilio from "twilio";
import { configurations } from "../app-configs.js";
import { identityProvider } from "../utils/name-generator.js";

const { VoiceResponse, MessagingResponse } = Twilio.twiml;
const isAValidPhoneNumber = (number) => /^[\d\+\-\(\) ]+$/.test(number);

const generateTokenForP2PCall = async (req, res) => {
  const identity = identityProvider();

  const accessToken = new Twilio.jwt.AccessToken(
    configurations.twilio_config.twilio_account_sid,
    configurations.twilio_config.twilio_twiml_api_key,
    configurations.twilio_config.twilio_twiml_api_secret,
    {
      identity,
    }
  );

  const grant = new Twilio.jwt.AccessToken.VoiceGrant({
    outgoingApplicationSid: configurations.twilio_config.twilio_twiml_app_sid,
    incomingAllow: true,
  });
  accessToken.addGrant(grant);
  const token = accessToken.toJwt();

  return res.status(200).json({
    status: 200,
    type: "success",
    message: "Got token from API",
    data: {
      token,
    },
  });
};

const voiceResponse = async (req, res) => {
  console.log("into voice responsse");
  const toNumberOrClientName = req.body.To;
  const callerId = configurations.twilio_config.twilio_caller_id;
  const twiml = new VoiceResponse();

  if (toNumberOrClientName === callerId) {
    // const dial = twiml.dial();
    // dial.client(identity);
  } else if (req.body.To) {
    // This is an outgoing call

    // set the callerId
    const dial = twiml.dial({
      callerId: callerId,
      record: true,
      method: "post",
      action: "https://6795-49-249-141-190.ngrok-free.app/recordings",
      recordingStatusCallback:
        "https://6795-49-249-141-190.ngrok-free.app/recording-status-callback",
    });
    // Check if the 'To' parameter is a Phone Number or Client Name
    // in order to use the appropriate TwiML noun
    const attr = isAValidPhoneNumber(toNumberOrClientName)
      ? "number"
      : "client";
    // const afterRecord = await twiml.record({
    //   timeout: 0,
    //   maxLength: 20,
    // });
    // console.log("afterRecord", afterRecord);
    const afterDial = await dial[attr]({}, toNumberOrClientName);
    console.log("afterDial", afterDial);
    // https://www.twilio.com/docs/voice/twiml/record
  } else {
    twiml.say("Thanks for calling!");
  }

  res.set("Content-Type", "text/xml");
  const twimlJson = twiml.toString();
  return res.send(twimlJson);
};

export const messageResponse = async (req, res) => {
  console.log("into message responsse");

  const twiml = new MessagingResponse();
  twiml.message("The Robots are coming! Head for the hills!");

  res.set("Content-Type", "text/xml");
  const twimlJson = twiml.toString();
  return res.send(twimlJson);
  // res.type("text/xml").send(twiml.toString());
};

export const handleCallStatus = async (req, res) => {
  console.log("===============================");
  console.log("into handleCallStatus", req);
};

const manageRecordings = (req) => {
  console.log("manageRecordings", req.body);
};

const manageRecordingStatus = (req) => {
  console.log("manageRecordingStatus", req.body);
};
export {
  generateTokenForP2PCall,
  voiceResponse,
  manageRecordings,
  manageRecordingStatus,
};

// ACTION
// {
//   AccountSid: 'AC5d6296fa9fb1be9b389c73ba7c822753',
//   ApiVersion: '2010-04-01',
//   ApplicationSid: 'AP367cba035a12e8d8c993fd0518096a19',
//   CallSid: 'CAdf72b70d6e0d815a3cf4af1e857eaf72',
//   CallStatus: 'completed',
//   Called: '',
//   Caller: 'client:VividLandoNevis',
//   DialBridged: 'true',
//   DialCallDuration: '5',
//   DialCallSid: 'CAdfd35455f9bf3b79a823d00d8cfd5f0f',
//   DialCallStatus: 'completed',
//   Direction: 'inbound',
//   From: 'client:VividLandoNevis',
//   RecordingDuration: '6',
//   RecordingSid: 'REc8030fa121a86811a0c0a3bbe6d80ad1',
//   To: ''
// }

// RECORDING_STATUS_CALLBACK
// {
//   RecordingSource: 'DialVerb',
//   RecordingTrack: 'both',
//   RecordingSid: 'REa23ed87d30a89fc2d54e5d816f7bd92e',
//   RecordingUrl: 'https://sd-recording-test-twilio.s3.ap-south-1.amazonaws.com/AC5d6296fa9fb1be9b389c73ba7c822753/REa23ed87d30a89fc2d54e5d816f7bd92e',
//   RecordingStatus: 'completed',
//   RecordingChannels: '1',
//   ErrorCode: '0',
//   CallSid: 'CA98b7311e5f3892d0fa7a36a0da18ec3d',
//   RecordingStartTime: 'Mon, 10 Jul 2023 11:57:06 +0000',
//   AccountSid: 'AC5d6296fa9fb1be9b389c73ba7c822753',
//   RecordingDuration: '29'
// }

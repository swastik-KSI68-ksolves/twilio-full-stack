import Twilio from "twilio";
import { configurations } from "../app-configs.js";
import { identityProvider } from "../utils/name-generator.js";

const { VoiceResponse } = Twilio.twiml;
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
    const dial = twiml.dial({ callerId: callerId, record, });
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

const manageRecordings = (req) => {
  console.log(req.body);
};

export { generateTokenForP2PCall, voiceResponse, manageRecordings };

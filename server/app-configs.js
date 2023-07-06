import dotenv from "dotenv";

dotenv.config();

const configurations = {
  app: {
    port: process.env.APP_PORT,
    app_name: process.env.APP_NAME,
    host: process.env.APP_HOST,
  },

  twilio_config: {
    twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
    twilio_caller_id: process.env.TWILIO_CALLER_ID,
    twilio_twiml_app_sid: process.env.TWILIO_TWIML_APP_SID,
    twilio_twiml_api_key: process.env.TWILIO_API_KEY,
    twilio_twiml_api_secret: process.env.TWILIO_API_SECRET,
  },
};

export { configurations };

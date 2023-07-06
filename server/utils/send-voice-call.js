const makeVoiceCall = async () => {
  try {
    const message = await client.calls.create({
      twiml:
        "<Response><Say>This message is for testing twillio calls.</Say></Response>",
      to: "+919717329725",
      from: "+18555330416",
    });
    console.log(message);
  } catch (error) {
    console.error(error);
  }
};

const makeOneToOneVoiceCall = async () => {};

export { makeOneToOneVoiceCall, makeVoiceCall };

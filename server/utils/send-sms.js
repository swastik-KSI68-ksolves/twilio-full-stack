const sendTextSmsToOne = (client, body, from, to, extraProps) => {
  const message = {
    body,
    from,
    to,
    ...extraProps,
  };

  return client.messages.create(message);
};

const sendTextSmsInBulk = async (client, body, from, numbers, extraProps) => {
  const messagePromises = numbers.map((to) => {
    return sendTextSmsToOne(client, body, from, to, extraProps);
  });
  return Promise.all(messagePromises);
};

const sendMmsToOne = (client, body, media, from, to, extraProps) => {
  const message = {
    media,
    body,
    from,
    to,
    ...extraProps,
  };
  return client.messages.create(message);
};

const sendMmsInBulk = async (
  client,
  body,
  media,
  from,
  numbers,
  extraProps
) => {
  const messagePromises = numbers.map((to) => {
    return sendMmsToOne(client, body, media, from, to, extraProps);
  });
  return Promise.all(messagePromises);
};

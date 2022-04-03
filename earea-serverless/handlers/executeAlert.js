exports.handler = async (event) => {

  // get flag of if allowed to alert
  const allowedToAlert = true;

  if (allowedToAlert) {
    // execute alert in arduino
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Knock Knock Knock',
        input: event,
      },
      null,
      2
    ),
  };
};

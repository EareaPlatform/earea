exports.handler = async (event) => {

  // execute some code with DB

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Saving alert ${event.name} to DB: ${event.data}`,
        input: event,
      },
      null,
      2
    ),
  };
};

exports.handler = async (event) => {

  // get flag if alerting is enabled
  const allowedToAlert = true;

  if (allowedToAlert) {
    // execute alert in arduino
  }

  return {
    statusCode: 200,
    body: 'Executed'
  };
};

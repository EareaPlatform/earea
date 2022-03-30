exports.handler = async (event) => {
  // call AI to decide if to alert
  const shouldAlert = event.data.reduce((previousSum, currentValue) => previousSum + currentValue, 0) > 20;

  if (shouldAlert) {
    // call lambda: Save data
    // call lambda: Execute alert
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: shouldAlert ? 'Execute alert' : 'Nothing happened',
        input: event,
      },
      null,
      2
    ),
  };
};

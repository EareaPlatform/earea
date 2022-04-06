const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  // call AI to decide if to alert
  const shouldAlert = true; //event.data.reduce((previousSum, currentValue) => previousSum + currentValue, 0) > 20;
  let message = shouldAlert ? 'Execute alert' : 'Nothing happened';

  if (shouldAlert) {
    // call lambda: Save data
    // call lambda: Execute alert
    const sns = new AWS.SNS();

    await sns.publish({
      Message: "alert",
      TopicArn: "arn:aws:sns:eu-central-1:249409715289:ExecuteAlert"
    }, function(err, data) {
      if(err) {
        console.error('error publishing to SNS');
        context.fail(err);
      } else {
        console.info('message published to SNS');
        message = `Alert executed. ID: ${data.MessageId}`;
      }
    }).promise();
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: JSON.stringify(message, null, 2),
        input: event,
      },
      null,
      2
    ),
  };
};
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'eu-central-1'
})

exports.handler = async (event) => {

    const params = buildSaveAlertParams(event);

    await dynamoDB.put(params).promise();

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

const buildSaveAlertParams = (event) => {
    const eventData = {
        timeStamp: event.timeStamp,
        sensorName: event.sensorName,
        alertDate: event.alertDate,
        time: event.time,
        precisionRate: event.precisionRate
    };

    const params = {
        TableName: 'alertsDB',
        Item: eventData
    };

    return params;
}
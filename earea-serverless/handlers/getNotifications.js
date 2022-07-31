/*const mockNotifications = (amountToMock = 10, sensors) => {
    const randomDate = () => {
        const start = new Date(2020, 1, 1);
        const end = new Date();

        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const result = [];
    const sensorsAmount = 6;

    for (let i = 0; i < amountToMock; i++) {
        const originId = i%3 === 0? `sound-${i}` : `vibration-${i}`;
        result.push({
            id: `${i}`,
            sensorOriginId: originId,
            time: randomDate(),
        });
    }

    return result;
};*/
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'eu-central-1'
})

exports.handler = async (event) => {
    //const { amountToFetch, pageNumber } = JSON.parse(event.body);

    const keys = {
        sensorName: event.sensorName,
        alertDate: event.alertDate,
    };

    const params = {
      TableName: 'alertsDB',
      Key: keys,
    };

    const lastNotificationsData = {
        notificationsData: await dynamoDB.get(params).promise(),
        amountOfPages: 2,
        currentPage: 1,
    };

    return {
        statusCode: 200,
        body: JSON.stringify(
            lastNotificationsData,
            null,
            2
        ),
    };
};

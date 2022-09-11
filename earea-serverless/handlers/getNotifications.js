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
});
const alertsTableName = 'alertsDB';

exports.handler = async (event) => {
    const notificationsData = await buildNotificationsData();

    const lastNotificationsData = {
        notificationsData,
        amountOfPages: Math.ceil(notificationsData.length/20),
        currentPage: 1,
    };

    return {
        statusCode: 200,
        body: JSON.stringify(lastNotificationsData),
    };
};

const buildNotificationsData = async () => {
    const params = {
        TableName: alertsTableName,
    };

    const notificationsData = [];
    const dynamoDbData = await dynamoDB.scan(params).promise();
    dynamoDbData.Items.forEach((item) => {
        const [month, day, year] = item.alertDate.split('.');
        const [hours, minutes] = item.time.split(':');

        const alertTime = new Date(+year, +month - 1, +day, +hours, +minutes, +'00');

        notificationsData.push({
            id: item.timeStamp,
            sensorOriginId: item.sensorName,
            time: alertTime,
        })

        notificationsData.sort((itemA, itemB) => { return parseInt(itemB.id) - parseInt(itemA.id)});
    });

    return notificationsData;
}
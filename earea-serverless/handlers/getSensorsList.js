/*const mockSensors = (amountToMock = 6) => {
    const randomDate = () => {
        const start = new Date(2021, 1, 1);
        const end = new Date();

        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const result = [];

    for (let i = 0; i < amountToMock; i++) {
        const type = i%3 === 0? `sound-sensor` : `vibration-sensor`;
        result.push({
            id: i % 3 === 0 ? `sound-${i}` : `vibration-${i}`,
            type: `${type}`,
            title: i % 3 === 0 ? `Sound ${i}` : `Vibration ${i}`,
            isOnline: false,
            lastActivity: randomDate(),
        });
    }

    return result;
};*/
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'eu-central-1'
})

exports.handler = async (event) => {
    //const { amountToFetch, pageNumber } = JSON.parse(event.body);
    const params = {
        TableName: 'alertsDB',
    };

    let lastActivity;
    const dynamoDbData = await dynamoDB.scan(params).promise();
    dynamoDbData.Items.forEach((item) => {
        const [month, day, year] = item.alertDate.split('.');
        const [hours, minutes] = item.time.split(':');

        const alertTime = new Date(+year, +month - 1, +day, +hours, +minutes, +'00');

        lastActivity = alertTime;
    });

    const sensorsDataArray = [
        {
            id: 'sound-1',
            type: 'sound-sensor',
            title: 'Sound 1',
            isOnline: true,
            lastActivity
        }
    ]
    const sensorsData = {
        sensorsData: sensorsDataArray,
        amountOfPages: 1,
        currentPage: 1,
    };

    return {
        statusCode: 200,
        body: JSON.stringify(
            sensorsData,
            null,
            2
        ),
    };
};

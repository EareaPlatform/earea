const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'eu-central-1'
})
const alertsTableName = 'alertsDB';

exports.handler = async (event) => {
    const lastActivity = await getLastActivity();
    const sensorsData = buildSensorsData(lastActivity);

    return {
        statusCode: 200,
        body: JSON.stringify(sensorsData),
    };
};

const getLastActivity = async () => {
    const params = {
        TableName: alertsTableName,
    };

    let lastActivity;
    let maxTimeStamp = 0;
    const dynamoDbData = await dynamoDB.scan(params).promise();
    dynamoDbData.Items.forEach((item) => {
        const timeStamp = parseInt(item.timeStamp);
        if(maxTimeStamp < timeStamp){
            maxTimeStamp = timeStamp;

            const [month, day, year] = item.alertDate.split('.');
            const [hours, minutes] = item.time.split(':');

            const alertTime = new Date(year, month - 1, day, hours, minutes, +'00');

            lastActivity = alertTime;
        }
    });

    return lastActivity;
}

const buildSensorsData = (lastActivity) => {
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

    return sensorsData;
}
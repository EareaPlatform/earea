const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'eu-central-1'
});

const settingsTableName = 'settings';

exports.handler = async (event) => {

    const params = {
        TableName: settingsTableName,
    };

    const settingsData = await dynamoDB.scan(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(
            settingsData,
            null,
            2
        ),
    };
};

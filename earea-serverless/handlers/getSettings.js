const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'eu-central-1'
});

const settingsTableName = 'settings';

exports.handler = async (event) => {

    const params = {
        TableName: settingsTableName,
    };

    const settings = {}
    const settingsData = await dynamoDB.scan(params).promise();

    settingsData.Items.forEach((item) => {
        settings[item.fieldName] = item.fieldValue
    });

    return {
        statusCode: 200,
        body: JSON.stringify(
            {settings},
            null,
            2
        ),
    };
};

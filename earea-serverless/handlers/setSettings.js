const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'eu-central-1'
});
const settingsTableName = 'settingsDB';

exports.handler = async (event) => {

    const settingsObjectsArray = JSON.parse(event.body).data;

    for (const setting of settingsObjectsArray) {
        console.log({setting});
        if(setting.fieldValue !== 'undefined'){
            const params = {
                TableName: settingsTableName,
                Key: {fieldName : setting.fieldName},
                UpdateExpression: 'set fieldValue = :v',
                ExpressionAttributeValues: {
                    ':v': setting.fieldValue
                },
            };

            await dynamoDB.update(params).promise();
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(
            'settings saved',
            null,
            2
        ),
    };
};
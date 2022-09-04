const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'eu-central-1'
});
const settingsTableName = 'settingsDB';

exports.handler = async (event) => {

    //const params = buildSaveSettingsParams(event);

    //await dynamoDB.put(params).promise();

    const settingsObjectsArray = event.body.split('}');
    for (const obj of settingsObjectsArray) {
        const index = settingsObjectsArray.indexOf(obj);
        if(index !== settingsObjectsArray.length - 1){
            const parsedObject = JSON.parse(obj.slice(1) + '}');
            const params = {
                TableName: settingsTableName,
                Key: {fieldName : parsedObject.fieldName},
                UpdateExpression: 'set fieldValue = :v',
                ExpressionAttributeValues: {
                    ':v': parsedObject.fieldValue
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

const buildSaveSettingsParams = (event) => {
    const settings = {
        userDisplayName: event.userDisplayName,
        isNotificationEnabled: event.isNotificationEnabled,
        phoneNotificationToken: event.phoneNotificationToken,
        bluetoothMACId: event.bluetoothMACId,
    };



    return params;
}
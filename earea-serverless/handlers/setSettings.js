const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'eu-central-1'
});
const settingsTableName = 'settings';

exports.handler = async (event) => {

    const params = buildSaveSettingsParams(event);

    await dynamoDB.put(params).promise();

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
    };

    const params = {
        TableName: settingsTableName,
        Item: settings
    };

    return params;
}
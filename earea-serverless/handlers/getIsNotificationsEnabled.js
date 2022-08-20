exports.handler = async (event) => {

    const NotificationEnableData = {
        isNotificationEnabled: true,
    };

    return {
        statusCode: 200,
        body: JSON.stringify(
            `${NotificationEnableData.isNotificationEnabled}`,
            null,
            2
        ),
    };
};

const AWS = require('aws-sdk');

exports.handler = async (event) => {
    // call AI to decide if to alert
    let shouldAlert = false;
    if(event.isBase64Encoded != undefined && event.isBase64Encoded){
        const eventBody = Buffer.from(event.body, 'base64').toString('ascii');
        shouldAlert = eventBody === 'true'//? false : event.data.reduce((previousSum, currentValue) => previousSum + currentValue, 0) > 20;
        console.log('event body decoded:', eventBody);
    }

    if (shouldAlert) {
        // call lambda: Save data
        // call lambda: Execute al
        const sns = new AWS.SNS();

        await sns.publish({
            Message: "alert",
            TopicArn: "arn:aws:sns:eu-central-1:249409715289:ExecuteAlert"
        }, function(err, data) {
            if(err) {
                console.error('error publishing to SNS');
                context.fail(err);
            } else {
                console.info('message published to SNS');
                message = `Alert executed. ID: ${data.MessageId}`;
            }
        }).promise();
    };

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: shouldAlert ? 'Execute alert' : 'Nothing happened',
                input: event,
            },
            null,
            2
        ),
    };
};

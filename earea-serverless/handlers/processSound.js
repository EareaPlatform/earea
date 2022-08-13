const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'eu-central-1'
})

exports.handler = async (event) => {
    // call AI to decide if to alert
    const soundSampleSize = 400;
    let shouldAlert = false;
    let soundValues;

    if(event.isBase64Encoded !== undefined && event.isBase64Encoded){
        const decodedEventBody = Buffer.from(event.body, 'base64').toString('ascii');
        soundValues = decodedEventBody;
        console.log('event body decoded:', decodedEventBody);
        console.log('event body type:', typeof decodedEventBody);

        const soundValuesArray = decodedEventBody.split(',').map((number) => {
            return parseInt(number, 10);
        });

        shouldAlert = soundValuesArray.filter((number) => { return number >= 20}).length >= 3 && soundValuesArray.length === soundSampleSize;
    }

    if (shouldAlert) {
        const soundData = {
            values: soundValues,
        };

        const params = {
            TableName: 'soundData',
            Item: soundData
        };
        await dynamoDB.put(params).promise();

        const lambda = new AWS.Lambda({
            region: 'eu-central-1'
        });
        const date = new Date();
        const eventData = {
            timeStamp: Date.now().toString(),
            sensorName: 'sound-1',
            alertDate: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear(),
            time: date.getHours() + ':' + date.getMinutes(),
            precisionRate: '87'
        };

        try{
            await lambda.invoke({
                FunctionName: 'arn:aws:lambda:eu-central-1:249409715289:function:earea-serverless-dev-saveAlert',
                InvocationType: 'RequestResponse',
                Payload: JSON.stringify(eventData, null, 2),
            }).promise();
        }catch (err){
            if(err) {
                console.error('error invoking saveAlert');
               console.log('error', err);
            } else {
                console.info('alertSaved');
                message = `Alert saved`;
            }
        }

        // call lambda: Execute ML
        const sns = new AWS.SNS();

        try{
            await sns.publish({
                Message: JSON.stringify({
                    title: 'Event Detected',
                    body: 'Someone is at the door'
                }),
                TopicArn: "arn:aws:sns:eu-central-1:249409715289:ExecuteAlert"
            }).promise();
        }catch (err){
            if(err) {
                console.error('error publishing to SNS');
                err.context.fail(err);
            } else {
                console.info('message published to SNS');
                message = `Alert executed. ID: ${err.data.MessageId}`;
            }
        }
    }

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

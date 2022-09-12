const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'eu-central-1'
});
const lambda = new AWS.Lambda({
    region: 'eu-central-1'
});
const soundDataTableName = 'soundData';
const sensorName = 'sound-1';
const soundThreshold = 75;
const soundSampleSize = 5;

exports.handler = async (event) => {
    const {shouldAlert, soundValues} = getEventBodyDecoded(event);

    const isNotificationsEnabled = await getIsNotificationsEnabled();

    if (shouldAlert) {
        await saveSoundDataToDb(soundValues);

        if(isNotificationsEnabled){
            const alertData = buildAlertData();
            await saveAlertToDb(alertData);

            //Check with ML model
            await executeAlert();
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: shouldAlert ? 'Execute alert' : 'Nothing happened',
            },
            null,
            2
        ),
    };
};

const executeAlert = async () => {
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

const getIsNotificationsEnabled = async () => {
    let isNotificationsEnabled = false;

    try{
        const  getSettingsLambdaResponse = await lambda.invoke({
            FunctionName: 'arn:aws:lambda:eu-central-1:249409715289:function:earea-serverless-dev-getSettings',
            InvocationType: 'RequestResponse',
        }).promise();

        const settingsObject= JSON.parse(JSON.parse(getSettingsLambdaResponse.Payload).body);
        isNotificationsEnabled = settingsObject.settings.isNotificationsEnabled === 'true';
    }catch (err){
        if(err) {
            console.error('error invoking getSettings');
            console.log('error', err);
        } else {
            console.info('getSettings');
        }
    }

    return isNotificationsEnabled;
}

const getEventBodyDecoded = (event) => {
    let shouldAlert = false;
    let soundValues;

    if(event.isBase64Encoded !== undefined && event.isBase64Encoded){
        const decodedEventBody = Buffer.from(event.body, 'base64').toString('ascii');
        soundValues = decodedEventBody;

        const soundValuesArray = decodedEventBody.split(',').map((number) => {
            return parseInt(number, 10);
        });

        shouldAlert = isSoundDataOverThreshold(soundValuesArray);
    }

    return({
        shouldAlert,
        soundValues,
    });
}

const saveSoundDataToDb = async (soundValues) => {
    const soundData = {
        values: soundValues,
    };

    const params = {
        TableName: soundDataTableName,
        Item: soundData
    };

    await dynamoDB.put(params).promise();
}

const buildAlertData = () => {
    const date = new Date();
    const alertData = {
        timeStamp: Date.now().toString(),
        sensorName,
        alertDate: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear(),
        time: (date.getHours() + 1)+ ':' + date.getMinutes(),
        precisionRate: '87'
    };

    return alertData;
}

const saveAlertToDb = async (alertData) => {
    try{
        await lambda.invoke({
            FunctionName: 'arn:aws:lambda:eu-central-1:249409715289:function:earea-serverless-dev-saveAlert',
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify(alertData, null, 2),
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
}

const isSoundDataOverThreshold = (soundValuesArray) => {
    let soundSamplesAboveThreshold = 0;
    for(let i = 0; i < soundValuesArray.length - soundSampleSize; i++){
        let soundSample = 0;
        for(let j = 0; j < soundSampleSize; j++){
            soundSample += soundValuesArray[i + j];
        }

        if(soundSample >= soundThreshold){
            soundSamplesAboveThreshold++;
        }
    }

    return  soundSamplesAboveThreshold >= 3;
}
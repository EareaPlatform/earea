const admin = require('firebase-admin');
const serviceAccount = require('../eareaFirebaseServiceAccount.json');
const AWS = require("aws-sdk");
const registrationToken = "fMKdUg3yRlqtiO5HhaG_xD:APA91bFgAe8rM6zKy3yPqmS6k5iJXKuAftj5kLXHJldCqdG0nqM3I1a29D9fIj08TY2J4En3SWoZd-i0bbQsFZGOSnLUZHydrmVg-xJxLFJLsTlnE10V1n3fSpnwaoB7bTAwgxPa2WUm";
const lambda = new AWS.Lambda({
  region: 'eu-central-1'
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.handler = async (event) => {

  // get flag of if allowed to alert
  const allowedToAlert = true;
  let res = {};

  const {phoneNotificationToken, userDisplayName} = await getSettings();
  console.log(phoneNotificationToken, userDisplayName);

  const snsRawMessage = JSON.parse(event?.Records?.[0]?.Sns?.Message ?? {});

  if (allowedToAlert) {
    const message = {
      notification: {
        title: userDisplayName? `Hey ${userDisplayName}` : snsRawMessage?.title,
        body: snsRawMessage?.body ?? 'Some sensors found something',
      },
      data: {
        someKey: 'someValue'
      },
      tokens: [phoneNotificationToken],
    };

    try {
      res = await admin.messaging().sendMulticast(message);
    } catch (err) {
      console.error(err);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        ...res,
        input: event,
      },
      null,
      2
    ),
  };
};

const getSettings = async () => {
  let settingsObject;

  try{
    const  getSettingsLambdaResponse = await lambda.invoke({
      FunctionName: 'arn:aws:lambda:eu-central-1:249409715289:function:earea-serverless-dev-getSettings',
      InvocationType: 'RequestResponse',
    }).promise();

    settingsObject= JSON.parse(JSON.parse(getSettingsLambdaResponse.Payload).body);

  }catch (err){
    if(err) {
      console.error('error invoking getSettings');
      console.log('error', err);
    } else {
      console.info('getSettings');
    }
  }

  return settingsObject.settings;
}
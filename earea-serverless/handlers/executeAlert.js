const admin = require('firebase-admin');
const serviceAccount = require('../eareaFirebaseServiceAccount.json');
const registrationToken = "fMKdUg3yRlqtiO5HhaG_xD:APA91bFgAe8rM6zKy3yPqmS6k5iJXKuAftj5kLXHJldCqdG0nqM3I1a29D9fIj08TY2J4En3SWoZd-i0bbQsFZGOSnLUZHydrmVg-xJxLFJLsTlnE10V1n3fSpnwaoB7bTAwgxPa2WUm";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.handler = async (event) => {

  // get flag of if allowed to alert
  const allowedToAlert = true;
  let res = {};

  const snsRawMessage = JSON.parse(event?.Records?.[0]?.Sns?.Message ?? {});

  if (allowedToAlert) {
    res = alertUser(snsRawMessage);
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

const alertUser = async (snsRawMessage) => {
  let res = {};


  const message = {
    notification: {
      title: snsRawMessage?.title ?? 'Hey you!',
      body: snsRawMessage?.body ?? 'Some sensors found something',
    },
    data: {
      someKey: 'someValue'
    },
    tokens: [registrationToken],
  };

  try {
    res = await admin.messaging().sendMulticast(message);
  } catch (err) {
    console.error(err);
  }

  return res;
}
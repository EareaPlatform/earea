const admin = require('firebase-admin');
const serviceAccount = require('../eareaFirebaseServiceAccount.json');
const registrationToken = "eRjV2FPwSU2-gdfG2j8gR5:APA91bFTyR4xTy3jV2EQLFl_v7agW50Ui32wL6x7U1at46jWFh1sRESJn1C6IZhaXehJvu9SZAD9E_j6OAfMpge7QG1cGQgcqHzw4bBe59a1Vm9ckUuixCwv8tAoSEWCaXRaobndyiX_";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.handler = async (event) => {

  // get flag of if allowed to alert
  const allowedToAlert = true;
  let res = {};

  if (allowedToAlert) {
    const message = {
      notification: {
        title: event?.title ?? 'Hey you!',
        body: event?.message ?? 'Some sensors found something',
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

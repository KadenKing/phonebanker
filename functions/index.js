const admin = require('./admin')
const db = require('./db')
const sendInvitations = require('./sendInvitations')
const functions = require('firebase-functions');


// const nodemailer = require('nodemailer')
// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //     cors(request, response, () => {
// //         response.send({data: 'hello from firebase'});
// //       });
// // });


// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: 'osphonebanker@gmail.com',
//       pass: functions.config().email.password
//   }
// });

// const mailOptions = (email, id) => ({
//   from: 'Phone Banker <osphonebanker@gmail.com>',
//   to: email,
//   subject: 'howdy pardner', // email subject
//   html: `<p style="font-size: 16px;">hey pardner</p>
//   <p><a href="localhost:3000/signup/${id}">signup here</a></p>
//       <br />
//   `
// });

exports.sendInvites = functions.https.onCall( async (data, context) => {
  if(!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'can only be called while authenticated')
  }
  // const { emails } = data
  // const fakeContext = {
  //   auth: {
  //     uid: '1mQtyFNnCJa2E6KsWhrNhTmT98r2', 
  //     email: 'kaden.king.king@gmail.com'
  //   }
  // }
  try {
    const orphans = await sendInvitations(emails, fakeContext)
    return orphans
  } catch(e) {
    console.log(e)
    return []
  }
})
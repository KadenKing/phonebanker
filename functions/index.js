const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
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

// const alreadyInvited = (email, inviterUid) => {
//   return db.collection('invites')
//   .where('email', '==', email)
//   .where('inviterUid', '==', inviterUid)
//   .get().then((snapshot) => {
//     return snapshot.size !== 0 ? null : email
//   })
// }

// const alreadyInvitedEmails = async (emails, inviterUid) => {
//   for(const email of emails) {
//     if(await alreadyInvited(email, inviterUid))
//   }
// }

// const filterInvitedEmails = async (emails, inviterUid) => {
//   const emailPromises = emails.map(email => alreadyInvited(email, inviterUid))
//   const filteredEmails = (await Promise.all(emailPromises)).filter(email => email)

//   return filteredEmails
// }

// const addInviteToDatabase = (email, inviterUid) => {
//   return db.collection('invites').add({email, inviterUid})
// }

exports.sendInvites = functions.https.onCall((data, context) => {
  if(!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'can only be called while authenticated')
  }
    const {emails} = data
    const inviterUid = context.auth.uid
    const newInvite = db.collection('invites').doc()
  
    emails.forEach(email => {
      const inviteRef = db.collection('invites')
        .where('email', '==', email)
        .where('inviterUid', '==', inviterUid)
      db.runTransaction(tx => {
        return tx.get(inviteRef).then(snapshot => {
          if(snapshot.size !== 0) {
            throw Error('this user has already send this invite')
          }
          return tx.set(newInvite, {email, inviterUid, type: 'invite'})
        })
        .catch(err => {
          console.log(err)
        })
      })
    })
  })
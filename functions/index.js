const admin = require('./admin')
const db = require('./db')
const { sendInvitations, fixOrphanedInvitations } = require('./sendInvitations')
const { acceptInvite } = require('./acceptInvite')
const functions = require('firebase-functions');

exports.checkOrphanedInvites = functions.auth.user().onCreate(user => {
  return fixOrphanedInvitations(user)
})

exports.acceptInvitation = functions.https.onCall(async (data, context) => {
  if(!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'can only be called while authenticated')
  }
  const {id} = data
  return acceptInvite(id)
})

exports.sendInvites = functions.https.onCall( async (data, context) => {
  if(!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'can only be called while authenticated')
  }

  // const fakeContext = {
  //   auth: {
  //     uid: '1mQtyFNnCJa2E6KsWhrNhTmT98r2',
  //     token: {
  //       email: 'kaden.king.king@gmail.com'
  //     }
  //   }
  // }
  const { emails } = data
  try {
    const orphans = await sendInvitations(emails, context)
    return orphans
  } catch(e) {
    console.log(e)
    return []
  }
})
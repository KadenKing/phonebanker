const db = require('./db')
const admin = require('./admin')

const getUidFromEmail = async (email) => {
    try{
        const user = await admin.auth().getUserByEmail(email)
        return user.uid
    } catch(e) {
        console.log(e)
        return null
    }
}

const getProfileByUid = async (uid) => {
    const response = await db.collection('users').doc(uid).get()
    const profile = response.data()
    return profile
}
const alreadySent = async (inviterUid, recipientUid) => {
    const snapshotRef = db.collection('invites').doc(`${inviterUid}_${recipientUid}`)

    const snapshot = await snapshotRef.get()
    const data = snapshot.data()
    console.log(Boolean(data))
    return Boolean(data)

}

const createInviteBody = (senderProfile) => (
    {
        senderFirstName: senderProfile.firstName,
        senderLastName: senderProfile.lastName,
        senderEmail: senderProfile.email,
        timestamp: admin.firestore.Timestamp.now(),
        read: false,
    }
)

const send = (recipientUid, inviterUid, inviterProfile) => {
    console.log(`sending to ${recipientUid}`)
    const inviteBody = createInviteBody(inviterProfile)

    const doc = {
        inviterUid,
        recipientUid,
        ...inviteBody,
    }
    const id = `${inviterUid}_${recipientUid}`

    db.collection('invites').doc(id).set(doc)
}

const sendOrphanedInvitation = (inviterUid, inviterProfile, orphanedEmail) => {
    const id = `${inviterUid}_${orphanedEmail}`
    console.log(`sending orphaned invite to ${id}`)
    const inviteBody = createInviteBody(inviterProfile)

    const doc = {
        orphanedEmail,
        inviterUid,
        ...inviteBody
    }
    db.collection('orphanedInvites').doc(id).set(doc)
    console.log(`finished sending orphan invite`)
}

const mapEmailsToUids = async (emails) => {
    function orphanReducer(agg, curr, i) {
        if (!curr) {
            return [...agg, emails[i]]
        } else {
            return agg
        }
    }

    const unfiltered = await Promise.all(emails.map(email => getUidFromEmail(email)))
    const uids = unfiltered.filter(uid => uid)
    const orphanedEmails = unfiltered.reduce(orphanReducer, [])

    return {uids, orphanedEmails}
}

const sendInvitations = async (emails, context) => {
    console.log('sending invitations')

    const inviterUid = context.auth.uid
    const inviterProfile = {
        ...(await getProfileByUid(inviterUid)),
        email: context.auth.email
    }
    
    console.log({inviterProfile})

    const {uids, orphanedEmails} = await mapEmailsToUids(emails)
    console.log({orphanedEmails})

    // console.log({uids})
    // const alreadySentList = await Promise.all(uids.map(uid => alreadySent(uid, inviterUid)))
    // console.log({goodUidIndices: alreadySentList})
    // const goodUids = uids.filter((uid, i) => !alreadySentList[i])

    uids.forEach(uid => send(uid, inviterUid, inviterProfile))
    orphanedEmails.forEach(orphan => sendOrphanedInvitation(inviterUid, inviterProfile, orphan))
    return orphanedEmails
}

module.exports = sendInvitations
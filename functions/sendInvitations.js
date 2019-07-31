const db = require('./db')
const admin = require('./admin')

const getUidFromEmail = async (email) => {
    try {
        const user = await admin.auth().getUserByEmail(email)
        return user.uid
    } catch (e) {
        console.log(e)
        return null
    }
}

const getProfileByUid = async (uid) => {
    const response = await db.collection('users').doc(uid).get()
    const profile = response.data()
    return profile
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

const send = (recipientUid, senderUid, senderProfile) => {
    console.log(`sending to ${recipientUid}`)
    const inviteBody = createInviteBody(senderProfile)

    const doc = {
        senderUid,
        recipientUid,
        ...inviteBody,
    }
    const id = `${senderUid}_${recipientUid}`

    db.collection('invites').doc(id).set(doc)
}

const sendOrphanedInvitation = (senderUid, senderProfile, orphanedEmail) => {
    const id = `${senderUid}_${orphanedEmail}`
    console.log(`sending orphaned invite to ${id}`)
    const inviteBody = createInviteBody(senderProfile)

    const doc = {
        orphanedEmail,
        senderUid,
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

    return { uids, orphanedEmails }
}

const getOrphanedInvitationsSentTo = async email => {
    const snapshot = await db.collection('orphanedInvites').where('orphanedEmail', '==', email).get()
    return snapshot.docs.map(doc => ({...doc.data(), id:doc.id}))
}

const fixOrphanedInvitations = async (user) => {
    const { email, uid } = user
    const orphanedInvitations = await getOrphanedInvitationsSentTo(email)
    
    const results = orphanedInvitations.map(async invitation => {
        console.log({invitation})
        return getProfileByUid(invitation.senderUid)
        .then(profile => {
            profile = {
                ...profile,
                email: invitation.senderEmail,
            }
            return send(uid, invitation.senderUid, profile)
        })
        .then(() => {
            return db.collection('orphanedInvites').doc(invitation.id).delete()
        })
        .catch(err => {
            throw err
        })
    })

    return Promise.all(results)
}

const sendInvitations = async (emails, context) => {
    const senderUid = context.auth.uid
    const senderProfile = {
        ...(await getProfileByUid(senderUid)),
        email: context.auth.token.email
    }

    const { uids, orphanedEmails } = await mapEmailsToUids(emails)

    uids.forEach(uid => send(uid, senderUid, senderProfile))
    orphanedEmails.forEach(orphan => sendOrphanedInvitation(senderUid, senderProfile, orphan))
    return orphanedEmails
}

module.exports = {
    sendInvitations,
    fixOrphanedInvitations,
}
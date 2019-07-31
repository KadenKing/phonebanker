const admin = require('./admin')
const db = require('./db')

const getInvitationbyId = async (id) => {
    const invitation = await db.collection('invites').doc(id).get()
    return invitation.data()
}

const getProfileByUid = async (uid) => {
    const response = await db.collection('users').doc(uid).get()
    return response.data()
}

const acceptInvite = async (id) => {
    const invitation = await getInvitationbyId(id)
    const { senderUid, recipientUid } = invitation
    const { firstName, lastName } = await getProfileByUid(recipientUid)

    const newDocref = db.collection('phonebankers').doc(id)
    const docToDelete = db.collection('invites').doc(id)
    
    const doc = {
        phonebankerUid: recipientUid,
        managerUid: senderUid,
        firstName,
        lastName,
    }
    var batch = db.batch()
    batch.set(newDocref,doc)
    batch.delete(docToDelete)
    return batch.commit()
    
}

module.exports = {
    acceptInvite
}
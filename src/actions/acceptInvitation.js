import { resolve } from "path";

const acceptInvitation = (id) => (dispatch, getState, {getFirebase, getFirestore}) => {
    return new Promise((revolve, reject) => {
        const accept = getFirebase().functions().httpsCallable('acceptInvitation')
        accept({id})
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })
}

export default acceptInvitation
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {snackbarActions as snackbar } from 'material-ui-snackbar-redux'


const sendInvitations = (emails) => (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(showLoading('sendInvitations'))
    return new Promise((resolve, reject) => {
        var send = getFirebase().functions().httpsCallable('sendInvites') 

        send({emails})
        .then(() => {
            resolve()
            dispatch(snackbar.show({
                message: 'Invitations have been sent'
            }))
            dispatch(hideLoading('sendInvitations'))
        })
        .catch((err) => {
            reject(err)
            dispatch(snackbar.show({
                message: 'An error occurred'
            }))
            dispatch(hideLoading('sendInvitations'))
        })
    })
}

export default sendInvitations
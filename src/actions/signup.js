import {snackbarActions as snackbar } from 'material-ui-snackbar-redux'

const signup = (credentials, profile) => (dispatch, getState, {getFirebase, getFirestore}) => {
    return new Promise((resolve, reject) => {
        getFirebase().createUser(credentials, profile)
        .then(() => {
            resolve()
            dispatch(snackbar.show({
                message: `Thanks for signing up, ${profile.firstName}`
            }))
        })
        .catch(err => {
            reject(err)
        })
    })
}

export default signup
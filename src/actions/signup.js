import {snackbarActions as snackbar } from 'material-ui-snackbar-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const signup = (credentials, profile) => (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(showLoading('signup'))
    return new Promise((resolve, reject) => {
        getFirebase().createUser(credentials, profile)
        .then(() => {
            resolve()
            dispatch(snackbar.show({
                message: `Thanks for signing up, ${profile.firstName}`
            }))
            dispatch(hideLoading('signup'))
        })
        .catch(err => {
            reject(err)
            dispatch(hideLoading('signup'))
        })
    })
}

export default signup
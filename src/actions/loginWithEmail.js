const loginWithEmail = (credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        getFirebase().login(credentials)
        .then(() => {
            dispatch({ type: 'LOGIN_SUCCESSFUL' })
        })
        .catch((err) => {
            dispatch({ type: 'LOGIN_FAILED' })
        })
    }
}

export default loginWithEmail
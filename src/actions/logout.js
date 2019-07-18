const logout = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        getFirebase().logout()
        .then(() => {
            dispatch({type: 'LOGOUT_SUCCESSFUL'})
        })
        .then(() => {
            dispatch({type: 'LOGOUT_FAILED'})
        })
    }
}

export default logout
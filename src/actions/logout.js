const logout = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        getFirebase().logout()
        .then(() => {
            dispatch({type: 'LOGOUT_SUCCESSFUL'})
        })
    }
}

export default logout
const initState = {
    message: ''
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESSFUL':
            console.log('login from thunk successful')
            return {
                ...state,
                message: '',
            }
        case 'LOGIN_FAILED':
            console.log('log from thunk failed')
            return {
                ...state,
                message: 'Could not login',
            }
        case 'LOGOUT_SUCCESSFUL':
            console.log('logged out successfully')
            return state
        case 'LOGOUT_FAILED':
            console.error('logout failed')
            return state
        default:
            return state
    }
}

export default authReducer
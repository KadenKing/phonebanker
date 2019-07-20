const initialState = {
    open: false,
    dialogName: '',
    dialogProps: {},
}

const dialogReducer = (state = initialState, action) => {
    console.log('dispatched')
    switch(action.type) {
        case 'OPEN_FS_DIALOG':
            console.log(action)
            return {
                ...state,
                open: true,
            }
        case 'RENDER_FS_DIALOG':
            return {
                ...state,
                ...action.payload
            }
        case 'CLOSE_FS_DIALOG':
            return {
                ...state,
                open: false,
            }
        default:
            return state
    }
}

export default dialogReducer
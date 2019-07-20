const renderDialog = (dialogName, dialogProps) => ({
    type: 'RENDER_FS_DIALOG',
    payload: {
        dialogName,
        dialogProps
    }
})

export default renderDialog
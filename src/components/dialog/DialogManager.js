import React from 'react'
import InvitePhonebankersDialog from '../phonebank/InvitePhonebankersDialog'
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import closeDialog from '../../actions/closeDialog'
import Slide from '@material-ui/core/Slide'


const dialogLookup = {
    InvitePhonebankersDialog,
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DialogManager = (props) => {
    const { dialogName, dialogProps, open } = props.fsDialog
    const { closing } = props
    const ModalComponent = dialogLookup[dialogName]

    function close() {
        closing()
    }

    return (
        <div>
            <Dialog fullScreen open={open} onClose={close} TransitionComponent={Transition}>
                { ModalComponent ? <ModalComponent {...dialogProps} /> : null}
            </Dialog>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        fsDialog: state.fsDialog
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closing: () => dispatch(closeDialog)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogManager)
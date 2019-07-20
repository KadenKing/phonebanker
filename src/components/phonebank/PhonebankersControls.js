import React, {Component } from 'react'
import {connect } from 'react-redux'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'
import NavigationIcon from '@material-ui/icons/Navigation'
import InvitePhonebankersDialog from './InvitePhonebankersDialog';
import { compose } from 'redux';
import openDialog from '../../actions/openDialog'
import renderDialog from '../../actions/renderDialog'
import DialogManager from '../dialog/DialogManager';

const styles = theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
});

class PhonebankersControls extends Component {
    state = {
        inviteDialog: false
    }

    componentDidMount() {
        this.props.renderDialog('InvitePhonebankersDialog')
    }

    handleClose = () => {
        this.setState({inviteDialog: false})
    }

    handleOpen = () => {
        this.props.openDialog()
        // this.setState({inviteDialog: true})
    }

    render() {
        const {classes} = this.props
        const {inviteDialog} = this.state
        return (
            <div>
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="Add"
                    className={classes.margin}
                    onClick = {this.handleOpen}
                >
                    <NavigationIcon className={classes.extendedIcon} />
                    Invite Phonebankers
                    </Fab>
                    <DialogManager/>
                    {/* <InvitePhonebankersDialog open={inviteDialog} handleClose={this.handleClose}/> */}
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        renderDialog: () => dispatch(renderDialog('InvitePhonebankersDialog', {
            open: true,
            title: 'Invite Phonebankers',
            action: 'Send Invitations',
        })),
        openDialog: () => dispatch(openDialog)
    }
}

export default compose(
    withStyles(styles),
    connect(null, mapDispatchToProps),
)(PhonebankersControls)
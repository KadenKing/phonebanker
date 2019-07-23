import React, {Component } from 'react'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'
import NavigationIcon from '@material-ui/icons/Navigation'
import InvitePhonebankersDialog from './InvitePhonebankersDialog';
import { compose } from 'redux';

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

    handleClose = () => {
        this.setState({inviteDialog: false})
    }

    handleOpen = () => {
        this.setState({inviteDialog: true})
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
                    <InvitePhonebankersDialog open={inviteDialog} handleClose={this.handleClose}/>
            </div>
        )
    }

}

export default compose(
    withStyles(styles)
)(PhonebankersControls)
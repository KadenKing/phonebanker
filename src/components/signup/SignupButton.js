import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import ListItemText from '@material-ui/core/ListItemText'
import SignupDialog from './SignupDialog'

class SignupButton extends Component {
    state = {
        open: false,
    }

    openDialog = () => {
        this.setState({open: true})
    }

    closeDialog = () => {
        this.setState({open: false})
    }

    render() {
        const { open } = this.state
    return (
        <div>
            <ListItem button onClick={this.openDialog}>
                <ListItemIcon><AddCircleIcon /></ListItemIcon>
                    <ListItemText primary="Signup" />
            </ListItem>
            <SignupDialog open={open} closeDialog={this.closeDialog} />
        </div >
    )}
}

export default SignupButton
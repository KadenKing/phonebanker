import React, { Component } from 'react'
import NostyleLink from '../routes/NostyleLink'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import PeopleIcon from '@material-ui/icons/People'
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
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText primary="Signup" />
            </ListItem>
            <SignupDialog open={open} closeDialog={this.closeDialog} />
        </div >
    )}
}

export default SignupButton
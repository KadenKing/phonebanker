import React, { Component } from 'react'
import LoginDialog from './LoginDialog'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PeopleIcon from '@material-ui/icons/People'

export default class LoginButton extends Component {
    state = {
        loginDialogOpen: false,
    }

    openLoginDialog = () => {
        this.setState({loginDialogOpen: true}
        )
    }

    closeLoginDialog = () => {
        this.setState({
            loginDialogOpen: false
        })
    }

    render() {
        const { loginDialogOpen } = this.state
        return (
            <div>
                <ListItem button onClick={this.openLoginDialog}>
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText primary="Login" />
                </ListItem>
                <LoginDialog open={loginDialogOpen} closeDialog={this.closeLoginDialog} />
            </div>
        )
    }
}

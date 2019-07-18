import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import LoginDialog from './LoginDialog'

export default class LoginButton extends Component {
    state = {
        loginDialogOpen: false,
    }

    openLoginDialog = () => {
        this.setState(
            {
                loginDialogOpen: true
            }
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
                <Button color="inherit" onClick={this.openLoginDialog}>Login</Button>
                <LoginDialog open={loginDialogOpen} closeDialog={this.closeLoginDialog}/>
            </div>
        )
    }
}

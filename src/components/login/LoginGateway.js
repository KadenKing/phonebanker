import React, { Component } from 'react'
import LoginDialog from '../navbar/LoginDialog'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class LoginGateway extends Component {
    state = {
        cancelled: false
    }

    cancel = () => {
        this.setState({cancelled: true})
    }

    render() {
        const { auth } = this.props
        const from = this.props.location.state.from

        if(this.state.cancelled) {
            return (
                <Redirect to="/"/>
            )
        }

        if(auth.uid) {
            return (
                <Redirect to={from}/>
            )
        }

        return (
            <div>
                <LoginDialog open={!auth.uid} closeDialog={this.cancel}></LoginDialog>
            </div>
        )
    }
}

export default connect(({firebase: {auth}}) => ({auth}))(LoginGateway)
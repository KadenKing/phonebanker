import React, {Component} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import { compose } from 'redux';
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import logout from '../../actions/logout'

class LogoutButton extends Component{
    handleLogout = () => {
        this.props.logout()
        this.props.history.push('/')
    }
    render() {
    return (
        <div>
            <Button color="inherit" onClick={this.handleLogout}>Logout</Button> 
        </div>
    )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }

}

export default compose(
    connect(null, mapDispatchToProps),
    withRouter
)(LogoutButton)
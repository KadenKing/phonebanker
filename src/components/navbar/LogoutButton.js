import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import logout from '../../actions/logout'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import PeopleIcon from '@material-ui/icons/People'
import ListItemText from '@material-ui/core/ListItemText'

class LogoutButton extends Component {
    handleLogout = () => {
        this.props.logout()
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <ListItem button onClick={this.handleLogout}>
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
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
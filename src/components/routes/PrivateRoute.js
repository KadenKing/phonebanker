import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import LoginGateway from '../login/LoginGateway'
import { connect } from 'react-redux'

const PrivateRoute = (topProps) => {
    const { component: Component, uid, ...rest } = topProps
    const auth  = topProps.auth

    return (
        <Route {...rest} render={(props) => (
            auth.uid
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: 'login',
                    state: {from: props.location}
                }}></Redirect>
        )} />
    )
}

const mapStateToProps = (state) => {
    const {auth} = state.firebase
    return {
        auth
    }
}

export default connect(mapStateToProps)(PrivateRoute)



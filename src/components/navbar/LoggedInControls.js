import React from 'react'
import Button from '@material-ui/core/Button'

export default function LoggedInControls({login}) {
    return (
        <div>
            <Button color="inherit" onClick={() => this.props.firebase.logout()}>Logout</Button>
        </div>
    )
}

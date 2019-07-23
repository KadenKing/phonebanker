import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import loginWithEmail from '../../actions/loginWithEmail'

class LoginDialog extends Component{
    state = {
        email: '',
        password: ''
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.auth.uid) {
            this.props.closeDialog()
        }
    }

    fieldChange = (e) => {
        const {id, value} = e.target
        this.setState(
            {
                [id]: value
            }
        )
    }

    submit = (e) => {
        e.preventDefault()
        this.props.loginWithEmail(this.state)

    }
    
    render() {
        const {open, closeDialog} = this.props
        return (
            <div>
            <Dialog open={open} onClose={closeDialog} aria-labelledby="form-dialog-title">
            <form onSubmit={this.submit}>
   
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
              <DialogContentText>
                  Login with your email and password
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                onChange={this.fieldChange}
                fullWidth
              />
                <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                onChange={this.fieldChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Login
              </Button>
            </DialogActions>
            </form>
          </Dialog>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        loginWithEmail: (credentials) => dispatch(loginWithEmail(credentials))
    }
}

const mapStateToProps = (state) => {
    const {firebase, authError} = state
    const {auth, profile} = firebase
    return {
        auth,
        profile,
        authError,
    }
}

export default compose(
    withFirebase,
    connect(mapStateToProps,mapDispatchToProps)
  )(LoginDialog)
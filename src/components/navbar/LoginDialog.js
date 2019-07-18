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

class LoginDialog extends Component{
    state = {
        email: '',
        password: ''
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
        this.login()
    }

    login = () => {
        this.props.firebase.login({
            email: this.state.email,
            password: this.state.password
        }).then(() => {
            console.debug('logged in')
            this.props.closeDialog()
            this.setState({
                email: '',
                password: ''
            })
        }).catch((err) => {
            console.debug(err)
        })
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
                  {JSON.stringify(this.props.auth)}
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

export default compose(
    withFirebase,
    connect(({ firebase: { auth, profile } }) => ({ auth, profile }))
  )(LoginDialog)
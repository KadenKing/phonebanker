import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import {ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import signup from '../../actions/signup'
import {compose} from 'redux'
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading-bar';

const styles = theme => ({
    sideBySide: {
        display: 'flex'
    },
    input: {
        margin: theme.spacing(1)
    },
    error: {
        backgroundColor: red
    },
    loadingBar: {
        backgroundColor: theme.palette.primary.main,
        height: 3, 
        position: 'absolute',
    }
})

class SignupDialog extends Component {
    state ={
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: null,
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', confirmPassword => {
            return confirmPassword !== this.state.password
        })
    }

    componentWillUnmount() {
        ValidatorForm.removeValidationRule('isPasswordMatch')
    }

    fieldChange = (e) => {
        const {name, value} = e.target
        this.setState(
            {
                [name]: value
            }
        )
    }

    error = (error) => {
        console.loge(error)
    }

    submit = (e) => {
        e.preventDefault()
        const {firstName, lastName, email, password} = this.state
        const credentials = {email, password}
        const profile = {firstName, lastName} 

        this.props.signupUser(credentials, profile)
        .then(() => {
            this.props.closeDialog()
        })
        .catch(({message}) => {
            this.setState({error: message})
        })
    }

    render() {
        const { open, closeDialog, classes } = this.props
        const { error } = this.state
        return (
            <div>
                <Dialog open={open} onClose={closeDialog} aria-labelledby="form-dialog-title">
                <LoadingBar showFastActions scope="signup" className={classes.loadingBar} />
                    <ValidatorForm onSubmit={this.submit} onError={this.error}>

                        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            {error ? <Typography color="error">{error}</Typography> : 'Complete this form to create your account'}
              </DialogContentText>
              
                <div className={classes.sideBySide}>

                <TextValidator
                                autoFocus
                                margin="dense"
                                name="firstName"
                                label="First Name"
                                type="text"
                                onChange={this.fieldChange}
                                className={classes.input}
                                required
                                fullWidth
                            />
                            <TextValidator
                                margin="dense"
                                name="lastName"
                                label="Last Name"
                                type="text"
                                onChange={this.fieldChange}
                                className={classes.input}
                                required
                                fullWidth
                            />
                </div>
        
                            <TextValidator
                                margin="dense"
                                name="email"
                                label="Email Address"
                                type="email"
                                onChange={this.fieldChange}
                                className={classes.input}
                                required
                                fullWidth
                            />
                            <TextValidator
                                margin="dense"
                                name="password"
                                label="Password"
                                type="password"
                                onChange={this.fieldChange}
                                className={classes.input}
                                required
                                fullWidth
                            />
                            <TextValidator
                                margin="dense"
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                onChange={this.fieldChange}
                                className={classes.input}
                                validators={['isPasswordMatch']}
                                errorMessages={['Passwords must match']}
                                required
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeDialog} color="primary">
                                Cancel
              </Button>
                            <Button type="submit" color="primary">
                                Sign Up
              </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    signupUser: (credentials, profile) => dispatch(signup(credentials, profile))
})

export default compose(
    withStyles(styles),
    connect(null, mapDispatchToProps)
)(SignupDialog)
import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AccountDialog = (props) => {
    const { open, onClose, onSubmit, children} = props 

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <form onSubmit={onSubmit}>

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

export default AccountDialog
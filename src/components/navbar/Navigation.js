import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/styles';
import LoginDialog from './LoginDialog'
import { compose } from 'redux'
import { withFirebase, isLoaded } from 'react-redux-firebase';
import { auth } from 'firebase';
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  });

class Navigation extends Component {
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
            const {classes} = this.props
            const {loginDialogOpen} = this.state

            return (
                <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Phonebanker
              </Typography>

            {this.props.auth.uid ? 
            <Button color="inherit" onClick={() => this.props.firebase.logout()}>Logout</Button> 
            :             
            <Button color="inherit" onClick={this.openLoginDialog}>Login</Button> }
            </Toolbar>
          </AppBar>
          <LoginDialog open={loginDialogOpen} closeDialog={this.closeLoginDialog}>
    
          </LoginDialog>
                </div>
            )
        } 
}

export default compose (
    withStyles(styles),
    withFirebase,
    connect(({firebase: {auth, profile}}) => ({auth, profile}))
)(Navigation)

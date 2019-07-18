import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/styles';
import { compose } from 'redux'
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import Container from '@material-ui/core/Container'

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
        render() {
            const {classes} = this.props

            return (
                <div>
          <AppBar position="static">
            <Container>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Phonebanker
              </Typography>

            {this.props.auth.uid ? 
            <LogoutButton />
            :             
            <LoginButton /> }
            </Toolbar>
            </Container>
          </AppBar>
                </div>
            )
        } 
}

export default compose (
    withStyles(styles),
    withFirebase,
    connect(({firebase: {auth, profile}}) => ({auth, profile}))
)(Navigation)

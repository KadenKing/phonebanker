import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CreatePhonebankMenu from '../phonebank/CreatePhonebankMenu';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoute'
import Home from '../home/Home'
import LoginGateway from '../login/LoginGateway'
import LoginButton from '../navbar/LoginButton'
import LogoutButton from '../navbar/LogoutButton'
import { connect } from 'react-redux'
import Phonebankers from '../phonebank/Phonebankers';
import PeopleIcon from '@material-ui/icons/People'
import NostyleLink from '../routes/NostyleLink'
import SignupButton from '../signup/SignupButton';
import Signup from '../signup/Signup';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

function Layout(props) {
  const { container, auth } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />

      <List>
        {
          auth.uid 
          ?
          <LogoutButton /> 
          :
          <div>
          <LoginButton />
          <SignupButton />
          </div>
        }
      </List>
      <Divider/>
      <List>
        {
          auth.uid
          &&
          <ListItem button>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <NostyleLink to="/phonebankers" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Phonebankers" />
          </NostyleLink>
        </ListItem>
        }

      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          {/* <Navigation /> */}

          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <NostyleLink to="/">Phonebanker</NostyleLink>
            </Typography>
            {/* {auth.uid ? 
            <LogoutButton />
            :        
            <div>    
            <LoginButton /> 
            </div> } */}
          </Toolbar>
          {/* <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Phonebanker
          </Typography>
        </Toolbar> */}
        </AppBar>
        <nav className={classes.drawer} aria-label="Mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginGateway} />
            <PrivateRoute path="/phonebankers" component={Phonebankers} />
            <PrivateRoute path="/script" component={CreatePhonebankMenu} />
            <Route path="/signup" component={Signup} />
            {/* <Route component={Notfound} /> */}
          </Switch>
        </main>
      </Router>
    </div>
  );
}

Layout.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};

const mapPropsToState = (state) => {
  const auth = state.firebase.auth
  return {
    auth
  }
}

export default connect(mapPropsToState)(Layout)
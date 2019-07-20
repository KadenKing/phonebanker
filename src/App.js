import React from 'react';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import {Container, Portal} from '@material-ui/core'
import CreatePhonebankMenu from './components/phonebank/CreatePhonebankMenu.js'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Navigation from './components/navbar/Navigation'
import Home from './components/home/Home'
import { connect } from 'react-redux'
import firebase from './config/firebaseConfig'
import LoginGateway from './components/login/LoginGateway'
import PrivateRoute from './components/routes/PrivateRoute'
import Layout from './components/layout/Layout'
import { deepPurple } from '@material-ui/core/colors';
import DialogManager from './components/dialog/DialogManager'

const theme = createMuiTheme({
  palette: {
    primary: deepPurple
  },
});

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     props.auth.uid
//       ? <Component {...props} />
//       : <LoginGateway from={props.location}/>
//   )} />
// )

// connect(({firebase: {auth}}) => ({auth}))(PrivateRoute)

const Routing = (props) => (
  <Router>
  <div>
    <Navigation></Navigation>
    <Container>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component = {LoginGateway} />
      <PrivateRoute path="/script" component={CreatePhonebankMenu} />
      {/* <Route component={Notfound} /> */}
    </Switch>
    </Container>
  </div>
</Router>
)

function App(props) {
  const {component} = props.fsDialog
  return (
    <MuiThemeProvider theme={theme}>
      <Layout />
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    fsDialog: state.fsDialog,
  }
}

export default connect(mapStateToProps)(App);

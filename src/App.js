import React from 'react';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import {Container} from '@material-ui/core'
import CreatePhonebankMenu from './components/phonebank/CreatePhonebankMenu.js'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import Navigation from './components/navbar/Navigation'
import Home from './components/home/Home'
import { connect } from 'react-redux'
import firebase from './config/firebaseConfig'
import LoginGateway from './components/login/LoginGateway'
import PrivateRoute from './components/routes/PrivateRoute'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[50],
      main: purple[300],
      dark: purple[900]
    },
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

function App() {
  return (
    <MuiThemeProvider theme={theme}>

        <Routing></Routing>

    </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => {
  const {auth} = state.firebase
  return {
    auth
  }
}

export default connect(mapStateToProps)(App);

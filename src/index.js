import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import {Provider} from 'react-redux'
import { compose, applyMiddleware } from 'redux'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'
import firebase from './config/firebaseConfig'
import { SnackbarProvider } from 'material-ui-snackbar-redux'

// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  // enableLogging: false, 
  logErrors: true, // enable/disable Firebase's database logging
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, config),
)(createStore)

// Create store with reducers and initial state
// const store = createStoreWithFirebase(rootReducer)


const store = createStoreWithFirebase(
    rootReducer, 
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore}))
)

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 3500, anchorOrigin: { vertical: 'top', horizontal: 'right'} }}>
    <App />
    </SnackbarProvider>
    </Provider>, document.getElementById('root'));
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

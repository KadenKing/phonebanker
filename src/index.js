import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux'
import {Provider} from 'react-redux'
import { compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'
import { reduxFirestore } from 'redux-firestore'
import rootReducer from './reducers/rootReducer'

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA9uiWUbdnBvJo3nsWj2t5S_LlPf6ck2PQ",
    authDomain: "phonebanker-6634a.firebaseapp.com",
    databaseURL: "https://phonebanker-6634a.firebaseio.com",
    projectId: "phonebanker-6634a",
    storageBucket: "phonebanker-6634a.appspot.com",
    messagingSenderId: "1020043871355",
    appId: "1:1020043871355:web:0f52bd40b72fe2a9"
  }
firebase.initializeApp(firebaseConfig)

// initialize Firestore
firebase.firestore()

// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, 
  logErrors: false, // enable/disable Firebase's database logging
  useFirestoreForProfile: true,
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config),
  reduxFirestore(firebase)
)(createStore)

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

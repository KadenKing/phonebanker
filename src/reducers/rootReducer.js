import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import dialogReducer from './dialogReducer'
import authReducer from './authReducer'

// Add firebase to reducers
const rootReducer = combineReducers({
  authError: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  fsDialog: dialogReducer,
})

export default rootReducer
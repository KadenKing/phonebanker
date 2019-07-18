import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import authReducer from './authReducer'

// Add firebase to reducers
const rootReducer = combineReducers({
  authError: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer
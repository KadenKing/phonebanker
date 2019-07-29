import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import dialogReducer from './dialogReducer'
import authReducer from './authReducer'
import { snackbarReducer } from 'material-ui-snackbar-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

// Add firebase to reducers
const rootReducer = combineReducers({
  authError: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  fsDialog: dialogReducer,
  snackbar: snackbarReducer,
  loadingBar: loadingBarReducer,
})

export default rootReducer
import firebase from 'firebase'

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

export default firebase
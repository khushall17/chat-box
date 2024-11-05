// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from "firebase"

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyAaJ2IbSd5StJxv12bIjNy6XDZ_ZAWsOGg",
  authDomain: "whatsappnew-57bcd.firebaseapp.com",
  projectId: "whatsappnew-57bcd",
  storageBucket: "whatsappnew-57bcd.appspot.com",
  messagingSenderId: "595722568904",
  appId: "1:595722568904:web:85ca9ea54f7b14b39951fd",
  measurementId: "G-8DQ44MDFDE"
};

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore (Firebase database)
const db = getFirestore(firebaseApp);

// Initialize Firebase Auth (Authentication)
const auth = getAuth(firebaseApp);

// Google Authentication provider
const provider = new GoogleAuthProvider();


export { auth, provider };
export default db;
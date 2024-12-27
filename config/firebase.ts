import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAt0qfW1uD0FAYTWn0ZamGKG1SeV1rxgHI",
    authDomain: "live-doc-firebase.firebaseapp.com",
    projectId: "live-doc-firebase",
    storageBucket: "live-doc-firebase.appspot.com",
    messagingSenderId: "43888933667",
    appId: "1:43888933667:web:48f8ac374ad431a21eaa96",
    measurementId: "G-1HZ17T5N1W"
  };;


firebase.initializeApp(firebaseConfig);

export default firebase;
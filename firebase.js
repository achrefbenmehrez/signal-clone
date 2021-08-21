import firebase from 'firebase/app'

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA292iWmsmAf4em-KnmXfTZkekakdWLucg",
    authDomain: "signal-clone-ec71c.firebaseapp.com",
    projectId: "signal-clone-ec71c",
    storageBucket: "signal-clone-ec71c.appspot.com",
    messagingSenderId: "1043444652944",
    appId: "1:1043444652944:web:77aded3cb65d465b9c7115",
    measurementId: "G-WCR4X5K3HQ"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore()
const auth = firebase.auth()

export { db, auth }
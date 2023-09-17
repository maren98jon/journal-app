// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuy5YgmA5fpsCuQVE6AGV5mPNJri0ASCo",
  authDomain: "react-journal-fe5c4.firebaseapp.com",
  projectId: "react-journal-fe5c4",
  storageBucket: "react-journal-fe5c4.appspot.com",
  messagingSenderId: "59335398810",
  appId: "1:59335398810:web:644fd15fe7f44e3d49d623"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
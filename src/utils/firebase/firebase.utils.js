// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import {
  getFirestore, 
  doc, 
  getDoc,
  setDoc
} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPGHphYNEIPkBJVyc-c8oYMaRU01Atm_c",
  authDomain: "crwn-clothing-db-fd235.firebaseapp.com",
  projectId: "crwn-clothing-db-fd235",
  storageBucket: "crwn-clothing-db-fd235.appspot.com",
  messagingSenderId: "1062416675166",
  appId: "1:1062416675166:web:22126a4724f1c2e8861fcf"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


// GoogleAuthProvider is class
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

const createUserDocumentFromAuth = async (userAuth) => {
  // doc(database, collection)
  const userDocRef = doc(db, 'users', )
}

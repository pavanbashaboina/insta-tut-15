import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-15-tut.firebaseapp.com",
  projectId: "insta-15-tut",
  storageBucket: "insta-15-tut.firebasestorage.app",
  messagingSenderId: "282464006997",
  appId: "1:282464006997:web:0fa5bd21078ca943acb5dc"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { app, auth, provider, signInWithPopup }
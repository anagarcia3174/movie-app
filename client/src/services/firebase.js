// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
};

const errorMessages = {
  "auth/email-already-exists":
    "This email address is already in use. Please use a different email or try logging in.",
  "auth/invalid-email":
    "The provided email address is invalid. Please enter a valid email address.",
  "auth/email-already-in-use":
    "This email address is already in use. Please use  a  different email or try logging in.",
  "auth/invalid-credential": "Invalid login credentials.",
  "auth/wrong-password": "Incorrect password.",
  "auth/weak-password": "Password is too weak.",
  "auth/too-many-requests": "Too many requests. Please try again later.",
  "auth/user-not-found":
    "There is no user record corresponding to this email address. Please check your email or sign up.",
  "auth/user-disabled": "This user account has been disabled.",
  "auth/user-mismatch":
    "The credentials provided do not match the user. Please check your credentials and try again.",
  "auth/user-signed-out": "The user has been signed out. Please sign in again.",
  "auth/invalid-profile-attribute": "Please enter a valid photo URL.",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default errorMessages;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
    } from "firebase/auth";

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

export const sendResetPasswordEmail = async (email) => {
  try{
    await sendPasswordResetEmail(auth, email);
  }catch (error){
    throw new Error(errorMessages[error.code] || "There was an error sending the reset password email. Please try again later.");
  }
};

export const sendVerificationEmail = async () => {
  const user = auth.currentUser;

  if(!user){
    throw new Error("No user is currently signed in.")
  }

  try{
    await sendEmailVerification(user);
  }catch(error){
    throw new Error(errorMessages[error.code] || "There was an error sending your verification email. Please try again later.");
  }
};

export const createUser = async (email, password) => {
 try{
  await createUserWithEmailAndPassword(auth, email, password);
 }catch(error){
  throw new Error(errorMessages[error.code] || "There was an error creating your account. Please try again later.");
 }
};

export const signIn = async (email, password) => {
  try{ 
    await signInWithEmailAndPassword(auth, email, password);
  }catch (error){
    throw new Error(errorMessages[error.code] || "There was an error signing in. Please try again later.");
  }
};

export const signUserOut = async () => {
  try{
    await signOut(auth);
  }catch (error) {
    throw new Error(errorMessages[error.code] || "There was an error signing out. Please try again later.");
  }
};

export const updateUser = async (profilePictureUrl,  displayName) => {
  const user = auth.currentUser;
  if(!user){
    throw new Error("No user is currently signed in.");
  }

  if (user.photoURL === profilePictureUrl && user.displayName === displayName) {
    throw new Error("No changes were made.");
  }

  try{
    await updateProfile(user, {
      displayName: displayName,
      photoURL: profilePictureUrl
    })
  } catch(error){
    throw new Error(errorMessages[error.code] || "There was an error updating your profile. Please try again later.");
  }
}


export default errorMessages;

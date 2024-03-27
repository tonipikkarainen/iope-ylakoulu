// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdkFJyXzqWV5JoF1BeYmTjUHAijSNKecQ",
  authDomain: "iope-b0702.firebaseapp.com",
  projectId: "iope-b0702",
  storageBucket: "iope-b0702.appspot.com",
  messagingSenderId: "387928557568",
  appId: "1:387928557568:web:7ac80236ad8c0e612430e5",
};

// Initialize Firebase
//const analytics = getAnalytics(app);

export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
console.log("Firebaseconfigista!!");
//

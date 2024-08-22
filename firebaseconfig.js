// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdYEEBFldr5ReCV7TZ29mwXKs2cKf2NIA",
  authDomain: "iope-ylakoulu.firebaseapp.com",
  projectId: "iope-ylakoulu",
  storageBucket: "iope-ylakoulu.appspot.com",
  messagingSenderId: "206741895685",
  appId: "1:206741895685:web:2bdf755b28124eb004fa6c",
  measurementId: "G-F4ZTMBKV9P",
};

// Initialize Firebase
//const analytics = getAnalytics(app);

export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
//const analytics = getAnalytics(app);
console.log("Firebaseconfigista!!");
//

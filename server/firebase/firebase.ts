// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOEwL1jmuCOJk4Z2s8vtlyN_3xs2z8x3A",
  authDomain: "journey-fantom.firebaseapp.com",
  projectId: "journey-fantom",
  storageBucket: "journey-fantom.appspot.com",
  messagingSenderId: "177065959384",
  appId: "1:177065959384:web:ac945c9abf9fd247489cad",
  measurementId: "G-MS15EWW76H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();

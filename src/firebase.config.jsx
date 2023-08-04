// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqUTLntGshj6OuwP-Vbt__I0b_xgYmB7s",
  authDomain: "fir-contactapp-8b2b5.firebaseapp.com",
  projectId: "fir-contactapp-8b2b5",
  storageBucket: "fir-contactapp-8b2b5.appspot.com",
  messagingSenderId: "912524182547",
  appId: "1:912524182547:web:5df7f9f7c3fb1f4dfa2be6",
  measurementId: "G-0QFR3NPHZ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

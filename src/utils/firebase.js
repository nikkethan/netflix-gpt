// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAnyQkins1Kz9ffotF--KURXmDmtV8Ppo",
  authDomain: "neflixgpt-273fc.firebaseapp.com",
  projectId: "neflixgpt-273fc",
  storageBucket: "neflixgpt-273fc.appspot.com",
  messagingSenderId: "709027418797",
  appId: "1:709027418797:web:0902866e2506d14c156c24",
  measurementId: "G-H3LLP28ZQ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

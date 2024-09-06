// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4AoL-4MOyYTg-btmkqIu-nhYbSXyxRKc",
  authDomain: "tic-tac-toe-55462.firebaseapp.com",
  projectId: "tic-tac-toe-55462",
  storageBucket: "tic-tac-toe-55462.appspot.com",
  messagingSenderId: "607004283385",
  appId: "1:607004283385:web:1494b7235f9019e5036d28",
  measurementId: "G-LGNBGGVE56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
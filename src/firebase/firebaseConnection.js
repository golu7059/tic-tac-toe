// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4AoL-4MOyYTg-btmkqIu-nhYbSXyxRKc",
  authDomain: "tic-tac-toe-55462.firebaseapp.com",
  projectId: "tic-tac-toe-55462",
  storageBucket: "tic-tac-toe-55462.appspot.com",
  messagingSenderId: "607004283385",
  appId: "1:607004283385:web:1494b7235f9019e5036d28",
  measurementId: "G-LGNBGGVE56",
  databaseURL: "https://tic-tac-toe-55462-default-rtdb.firebaseio.com/"  // Add the database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };

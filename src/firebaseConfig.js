// Import the necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2_qISV6v4CpQNAMUZS28wH6vO3uxhMYY",
  authDomain: "chatapp-114ca.firebaseapp.com",
  projectId: "chatapp-114ca",
  storageBucket: "chatapp-114ca.appspot.com",
  messagingSenderId: "209873660448",
  appId: "1:209873660448:web:509b0ad9e8d09057e1ea45",
  measurementId: "G-6QSLLRDNX8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app); // For user authentication
const db = getFirestore(app); // For Firestore database

export { auth, db };

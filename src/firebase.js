import { initializeApp } from "firebase/app";
import { getFirestore, FieldValue } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmNcuusWtUHXoH93nRwcQ1DXSfW6PUMiw",
  authDomain: "web-analytics-f3080.firebaseapp.com",
  projectId: "web-analytics-f3080",
  storageBucket: "web-analytics-f3080.appspot.com",
  messagingSenderId: "8340357987",
  appId: "1:8340357987:web:42462f12842eecb3068956",
  measurementId: "G-4CCLBE4T1M",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, FieldValue };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuhaGfyn79iyiT4lmUyRb9PMyKVzOpjPo",
  authDomain: "time-tracker-950a4.firebaseapp.com",
  projectId: "time-tracker-950a4",
  storageBucket: "time-tracker-950a4.appspot.com",
  messagingSenderId: "526465382103",
  appId: "1:526465382103:web:78f957cd654878c44b6292",
  measurementId: "G-E46M51FFL9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

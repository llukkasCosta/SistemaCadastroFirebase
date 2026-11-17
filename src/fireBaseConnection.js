// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaK83EyEw6KyYB0Jse40rCYWCKfH8gORE",
  authDomain: "palwordjames.firebaseapp.com",
  projectId: "palwordjames",
  storageBucket: "palwordjames.firebasestorage.app",
  messagingSenderId: "369697936799",
  appId: "1:369697936799:web:0442280a9215784bea99aa",
  measurementId: "G-6KREEX8FWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = getFirestore(app)
const auth = getAuth(app)
export {db, auth}
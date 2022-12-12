// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOkHMKmUv9Q-kWZ_LIPgqABrfU3TtAXig",
  authDomain: "todoapp-21167.firebaseapp.com",
  projectId: "todoapp-21167",
  storageBucket: "todoapp-21167.appspot.com",
  messagingSenderId: "627753249215",
  appId: "1:627753249215:web:1dbd9d47c00a2c5c84190a",
  measurementId: "G-ECG768HBV8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
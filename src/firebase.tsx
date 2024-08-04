// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsl-B9XoTqR58hpV4Mrxx3irpNixUsoSo",
  authDomain: "pantry-tracker-1d29e.firebaseapp.com",
  projectId: "pantry-tracker-1d29e",
  storageBucket: "pantry-tracker-1d29e.appspot.com",
  messagingSenderId: "581370683781",
  appId: "1:581370683781:web:68cfbac0ede698556a24ec",
  measurementId: "G-PGPM1N11PJ",
  databaseURL: "https://pantry-tracker-1d29e-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

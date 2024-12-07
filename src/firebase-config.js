// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCuW09CffNg3QSR2vAAhwIjcZ691i8nqsk",
    authDomain: "controlealuguelfestas.firebaseapp.com",
    projectId: "controlealuguelfestas",
    storageBucket: "controlealuguelfestas.firebasestorage.app",
    messagingSenderId: "417337600342",
    appId: "1:417337600342:web:47de2c1fa2223edc438ef7",
    measurementId: "G-4F82TDLVFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
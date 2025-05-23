
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth, GoogleAuthProvider } from "firebase/auth"; // Added GoogleAuthProvider

const firebaseConfig = {
  apiKey: "AIzaSyB7U7l77GCjF9m3q8Jp8ZBVQ0z34CQL30E",
  authDomain: "higgs-estate.firebaseapp.com",
  projectId: "higgs-estate",
  storageBucket: "higgs-estate.firebasestorage.app",
  messagingSenderId: "947433875880",
  appId: "1:947433875880:web:66e9ad1ce5d1017218d59d"
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Create a GoogleAuthProvider instance

export { app, auth, googleProvider };

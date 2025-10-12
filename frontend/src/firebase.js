// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-9ae12.firebaseapp.com",
  projectId: "mern-blog-9ae12",
  storageBucket: "mern-blog-9ae12.appspot.app",
  messagingSenderId: "271347978013",
  appId: "1:271347978013:web:b18b3d65d5ec847c1d5bf4",
  measurementId: "G-SF9Y266RSP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCkqUJ4j73wSAfa6V2GtmOLzo8OoOoMus",
  authDomain: "gpmp2-4f48e.firebaseapp.com",
  projectId: "gpmp2-4f48e",
  storageBucket: "gpmp2-4f48e.appspot.com",
  messagingSenderId: "1031439075865",
  appId: "1:1031439075865:web:bbc85b6d1c0a0647927888"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

export default db;

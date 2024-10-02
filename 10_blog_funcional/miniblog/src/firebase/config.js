// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsUhIPhWT1FSuNxrDwf5F8fKt8144Zrg0",
  authDomain: "bloglearning-1059e.firebaseapp.com",
  projectId: "bloglearning-1059e",
  storageBucket: "bloglearning-1059e.appspot.com",
  messagingSenderId: "639475290751",
  appId: "1:639475290751:web:83737aebf453c6012da54a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Inicializando o bando de dadoos

const db = getFirestore(app)
const auth = getAuth(app)

// exportando o banco de dados para uso posterior no aplicativo.

export {db, auth};
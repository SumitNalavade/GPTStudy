import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASEAPIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASEAUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASEPROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASESTORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASEMESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASEAPPID
};
  
export default firebaseConfig;
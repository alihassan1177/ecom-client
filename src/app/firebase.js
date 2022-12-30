import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCXYGJZjTF_qNkuxhTVyJMnPJtyCu5MDVk",
  authDomain: "ecom-client-4bcf4.firebaseapp.com",
  projectId: "ecom-client-4bcf4",
  storageBucket: "ecom-client-4bcf4.appspot.com",
  messagingSenderId: "256536273207",
  appId: "1:256536273207:web:9ab649279450486929fab2"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

const provider = new GoogleAuthProvider()

export async function signInWithGoogle(){
  const result= await signInWithPopup(auth, provider)
  return result.user
}

export const SALES_COLLECTION_KEY = "sales"

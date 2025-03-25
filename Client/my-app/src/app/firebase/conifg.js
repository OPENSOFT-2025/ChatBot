import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import dotenv from "dotenv";
dotenv.config(); 
// console.log(process.env.CHATBOT_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_CHATBOT_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_CHATBOT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_CHATBOT_FIREBASE_AUTH_PROJECT_ID,
  storageBucket:process.env.CHATBOT_FIREBASE_AUTH__STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_CHATBOT_FIREBASE_AUTH_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_CHATBOT_FIREBASE_AUTH_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
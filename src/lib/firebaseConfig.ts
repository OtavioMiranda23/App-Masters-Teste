import { FirebaseOptions } from "firebase/app";

export const firebaseConfig:FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
}
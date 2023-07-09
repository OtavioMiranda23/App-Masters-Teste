import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

export const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig)
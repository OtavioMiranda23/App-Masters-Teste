import { initializeApp, getApps } from "firebase/app";
import { getAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from "./firebaseConfig";

const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig)
const auth = getAuth(app);
const store = getFirestore(app);

auth.setPersistence(browserLocalPersistence);

export {app, auth, store};
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "visualhqportfolio",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
);

const firebaseApp = firebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

// The workspace is deployed to the named `kostyle` Firestore database
// (see firebase.json and scripts/migrate-firestore.ts). Keep the client on
// that database even when local env files omit the optional variable.
const databaseId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID ?? "kostyle";

export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export const db = firebaseApp
  ? databaseId === "(default)"
    ? getFirestore(firebaseApp)
    : getFirestore(firebaseApp, databaseId)
  : null;
export const storage = firebaseApp && firebaseConfig.storageBucket ? getStorage(firebaseApp) : null;

export const firebaseProjectId = firebaseConfig.projectId;

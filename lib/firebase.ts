import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCD5HxJW9NdVNI_LXkxM15_uPYICV4sYqw",
  authDomain: "zenaqr-40bec.firebaseapp.com",
  projectId: "zenaqr-40bec",
  storageBucket: "zenaqr-40bec.firebasestorage.app",
  messagingSenderId: "125305459266",
  appId: "1:125305459266:web:5b66a01155acadeb86d3db",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
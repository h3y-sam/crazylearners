import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// TODO: Replace with your actual Firebase configuration
// You can get this from the Firebase Console -> Project Settings
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDummyKeyForDemoPurposesOnly",
  authDomain: "crazy-learners-demo.firebaseapp.com",
  projectId: "crazy-learners-demo",
  storageBucket: "crazy-learners-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const isDummyKey = firebaseConfig.apiKey === "AIzaSyDummyKeyForDemoPurposesOnly";

let app;
let auth: Auth | null = null;

if (!isDummyKey) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
    } catch (error) {
        console.error("Firebase initialization failed:", error);
    }
} else {
    console.warn("⚠️ Using Dummy Firebase Config. Switching to Mock Authentication Mode.");
}

export { auth, isDummyKey };
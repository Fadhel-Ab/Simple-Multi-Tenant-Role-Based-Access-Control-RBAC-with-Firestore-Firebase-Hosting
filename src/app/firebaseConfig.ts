// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvkm9r5nDn1JI_ufXG-SRNsb8vgHIiLGE",
  authDomain: "rbac-multi-tenant-role-based-a.firebaseapp.com",
  projectId: "rbac-multi-tenant-role-based-a",
  storageBucket: "rbac-multi-tenant-role-based-a.firebasestorage.app",
  messagingSenderId: "471559734736",
  appId: "1:471559734736:web:cc01d532019da90bbe25d5",
  measurementId: "G-EHFC68XK9T"
};

// DEV-safe initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Initialize Firebase
export const db = getFirestore(app);
// Analytics only on client
export let analytics: ReturnType<typeof getAnalytics> | undefined;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
/**
 * ============================================================
 * Firebase Configuration & Initialization
 * ============================================================
 *
 * This module sets up the connection between your app and your
 * Firebase project. It initializes two core services:
 *
 *   1. Firebase Authentication – handles user sign-up, login,
 *      and session management.
 *   2. Cloud Firestore – a NoSQL document database used to
 *      store users, salons, and bookings.
 *
 * HOW TO CONNECT YOUR FIREBASE PROJECT
 * -------------------------------------
 * 1. Go to https://console.firebase.google.com/
 * 2. Click "Add project" (or select an existing one).
 * 3. In the project dashboard, click the web icon (</>) to
 *    register a new web app.
 * 4. Firebase will display a config object — copy those values
 *    into the `firebaseConfig` object below.
 * 5. Enable Authentication:
 *      → Build → Authentication → Get Started
 *      → Enable "Email/Password" sign-in method.
 * 6. Enable Firestore:
 *      → Build → Firestore Database → Create Database
 *      → Choose a region and start in **test mode** (for dev).
 *
 * IMPORTANT: For production apps, store these keys in
 * environment variables instead of hard-coding them here.
 * ============================================================
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ----- Firebase project credentials -----
const firebaseConfig = {
  apiKey: "AIzaSyDaIpZeMM2W0DhDxgpgCT_9i3tgrbP7IzU",
  authDomain: "beauty-saloon-3f5c6.firebaseapp.com",
  projectId: "beauty-saloon-3f5c6",
  storageBucket: "beauty-saloon-3f5c6.firebasestorage.app",
  messagingSenderId: "293448542272",
  appId: "1:293448542272:web:748392d4c37c7ef15717a5",
  measurementId: "G-FX0C7FFE1X",
};

// Initialize the Firebase application instance.
// This must be called before using any Firebase service.
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it so that
// authService.js can use it for sign-up / login / logout.
const auth = getAuth(app);

// Initialize Cloud Firestore and export it so that
// salonService.js and bookingService.js can read/write data.
const db = getFirestore(app);

export { app, auth, db };
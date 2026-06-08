/**
 * ============================================================
 * Authentication Service
 * ============================================================
 *
 * Provides all user-facing authentication operations backed by
 * Firebase Authentication and mirrored to a Firestore "users"
 * collection so we can store additional profile data (name).
 *
 * Firestore "users" collection schema
 * ------------------------------------
 * Document ID = Firebase Auth UID
 * {
 *   uid:        string   – Firebase Auth UID (duplicated for convenience)
 *   name:       string   – display name chosen during registration
 *   email:      string   – email used for sign-up
 *   createdAt:  timestamp – server-generated creation timestamp
 * }
 *
 * Exported functions
 * ------------------
 *   registerUser(name, email, password)  → UserCredential
 *   loginUser(email, password)           → UserCredential
 *   logoutUser()                         → void
 *   getCurrentUser()                     → User | null
 * ============================================================
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig.js";

// ---------------------------------------------------------------
// registerUser
// ---------------------------------------------------------------
/**
 * Creates a new user account with Firebase Authentication and
 * writes a matching profile document to the "users" collection.
 *
 * @param {string} name     – The user's display name.
 * @param {string} email    – The user's email address.
 * @param {string} password – A password (min 6 chars, Firebase rule).
 * @returns {Promise<import("firebase/auth").UserCredential>}
 * @throws {Error} If any required field is empty.
 */
export async function registerUser(name, email, password) {
  // --- Validation: reject empty fields ---
  if (!name || !name.trim()) {
    throw new Error("Name is required.");
  }
  if (!email || !email.trim()) {
    throw new Error("Email is required.");
  }
  if (!password || !password.trim()) {
    throw new Error("Password is required.");
  }

  // Step 1 – Create the user in Firebase Authentication.
  // This returns a UserCredential containing the new user's UID.
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  const user = userCredential.user;

  // Step 2 – Write a profile document to Firestore.
  // We use `setDoc` with the UID as the document ID so that
  // every Auth user has exactly one matching Firestore profile.
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: name.trim(),
    email: email.trim(),
    createdAt: serverTimestamp(), // Firestore server-side timestamp
  });

  return userCredential;
}

// ---------------------------------------------------------------
// loginUser
// ---------------------------------------------------------------
/**
 * Signs in an existing user with email and password.
 *
 * @param {string} email    – The user's registered email.
 * @param {string} password – The user's password.
 * @returns {Promise<import("firebase/auth").UserCredential>}
 * @throws {Error} If any required field is empty.
 */
export async function loginUser(email, password) {
  // --- Validation: reject empty fields ---
  if (!email || !email.trim()) {
    throw new Error("Email is required.");
  }
  if (!password || !password.trim()) {
    throw new Error("Password is required.");
  }

  // Firebase compares the supplied credentials against its
  // internal user store and returns a UserCredential on success.
  return signInWithEmailAndPassword(auth, email.trim(), password);
}

// ---------------------------------------------------------------
// logoutUser
// ---------------------------------------------------------------
/**
 * Signs out the currently authenticated user.
 * After this call, `auth.currentUser` will be null.
 *
 * @returns {Promise<void>}
 */
export async function logoutUser() {
  // `signOut` clears the local session token.
  return signOut(auth);
}

// ---------------------------------------------------------------
// getCurrentUser
// ---------------------------------------------------------------
/**
 * Returns the currently signed-in user, or null if nobody is
 * signed in. Wraps the check in a one-shot auth-state listener
 * so it works even before Firebase has finished restoring the
 * session from persistence (unlike `auth.currentUser` which can
 * briefly be null on page load).
 *
 * @returns {Promise<import("firebase/auth").User | null>}
 */
export function getCurrentUser() {
  return new Promise((resolve) => {
    // `onAuthStateChanged` fires immediately with the current
    // auth state once Firebase finishes initializing.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // We only need the first emission.
      resolve(user);
    });
  });
}

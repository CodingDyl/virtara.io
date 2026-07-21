import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";

/**
 * Firebase web config keys are public by design — they identify the project,
 * they do not authorise access (Firestore security rules do). They live in env
 * vars so each environment can point at its own project.
 *
 * TODO: once VITE_FIREBASE_* is set in the Vercel dashboard (Settings ->
 * Environment Variables) for Production, Preview and Development, delete
 * `fallback` and read the env vars directly. Until then the literals keep
 * deploys from silently breaking newsletter signup and audit bookings.
 */
const fallback = {
  apiKey: "AIzaSyC8lb1mKwszvYjjgIU5NXaTjRfS4Nq0Jjs",
  authDomain: "virtec-crm.firebaseapp.com",
  projectId: "virtec-crm",
  storageBucket: "virtec-crm.firebasestorage.app",
  messagingSenderId: "135812408783",
  appId: "1:135812408783:web:6a664000a7d7edee4d9eba"
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || fallback.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || fallback.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || fallback.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || fallback.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || fallback.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || fallback.appId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const subscribeToNewsletter = async (email, name, unsubscribed = false) => {
  try {
    // Check if the email already exists
    const subscribersRef = collection(db, 'subscribers');
    const q = query(subscribersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        success: false,
        message: 'This email is already subscribed'
      };
    }

    // Add new subscriber with email, name, and unsubscribed status
    await addDoc(subscribersRef, {
      email,
      name,
      unsubscribed: false, // Set to false by default
      dateSubscribed: serverTimestamp()
    });

    return {
      success: true,
      message: 'Successfully subscribed to newsletter!'
    };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again.'
    };
  }
};

export const unsubscribeFromNewsletter = async (email) => {
  try {
    // Check if email exists
    const q = query(collection(db, "subscribers"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "This email is not subscribed to the newsletter." };
    }

    // Update unsubscribed status
    await updateDoc(querySnapshot.docs[0].ref, {
      unsubscribed: true
    });

    return { success: true, message: "Successfully unsubscribed from newsletter!" };
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return { success: false, message: "Failed to unsubscribe. Please try again." };
  }
};

export const submitAuditBooking = async (bookingData) => {
  try {
    const bookedAuditsRef = collection(db, 'bookedAudits');
    
    // Add the booking with a server timestamp
    const docRef = await addDoc(bookedAuditsRef, {
      ...bookingData,
      dateTime: `${bookingData.preferredDate} ${bookingData.preferredTime}`,
      submittedAt: serverTimestamp(),
      status: 'pending' // You can use this to track the booking status
    });

    return {
      success: true,
      message: 'Audit booking submitted successfully!',
      bookingId: docRef.id
    };
  } catch (error) {
    console.error('Error submitting audit booking:', error);
    return {
      success: false,
      message: 'Failed to submit booking. Please try again.'
    };
  }
};

export { app, db };
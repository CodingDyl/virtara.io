import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8lb1mKwszvYjjgIU5NXaTjRfS4Nq0Jjs",
  authDomain: "virtec-crm.firebaseapp.com",
  projectId: "virtec-crm",
  storageBucket: "virtec-crm.firebasestorage.app",
  messagingSenderId: "135812408783",
  appId: "1:135812408783:web:6a664000a7d7edee4d9eba"
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
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

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

export const subscribeToNewsletter = async (email) => {
  try {
    // Check if email already exists
    const q = query(collection(db, "subscribers"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return { success: false, message: "This email is already subscribed!" };
    }

    // Add new subscriber
    await addDoc(collection(db, "subscribers"), {
      email,
      dateSubscribed: new Date(),
      unsubscribed: false
    });

    return { success: true, message: "Successfully subscribed to newsletter!" };
  } catch (error) {
    console.error("Error subscribing:", error);
    return { success: false, message: "Failed to subscribe. Please try again." };
  }
};

export { app, db };
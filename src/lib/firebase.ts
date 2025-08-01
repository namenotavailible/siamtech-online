
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDVvRFbYunXAenLAoctEJNUAvzLpY8ngg4",
  authDomain: "account-siamtech.firebaseapp.com",
  projectId: "account-siamtech",
  storageBucket: "account-siamtech.appspot.com",
  messagingSenderId: "572082007637",
  appId: "1:572082007637:web:7f11066334bce13f852edc"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
auth.useDeviceLanguage(); // Use the device's default language

// Initialize Firestore
export const db = getFirestore(app);

// Configure Google provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Add additional scopes for Google provider
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Export serverTimestamp for use in components
export { serverTimestamp };

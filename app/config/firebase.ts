import { initializeApp, getApps, getApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config';

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default app; 
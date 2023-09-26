import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyC_tJyO67WymS2bdi8wuA7SXng8-rSxj_4",
  authDomain: "interview-90f50.firebaseapp.com",
  projectId: "interview-90f50",
  storageBucket: "interview-90f50.appspot.com",
  messagingSenderId: "676423103653",
  appId: "1:676423103653:web:88aab820bac556da6a494c",
  measurementId: "G-GHQ9LMTHD4"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
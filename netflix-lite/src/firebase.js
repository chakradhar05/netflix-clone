
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuQ5WN-MXNr6qIYyuuT87sRO8f-Y3jkwc",
  authDomain: "netflix-clone-aadc7.firebaseapp.com",
  projectId: "netflix-clone-aadc7",
  storageBucket: "netflix-clone-aadc7.appspot.com",
  messagingSenderId: "241330844376",
  appId: "1:241330844376:web:49473a2a494053ab0a5dad"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
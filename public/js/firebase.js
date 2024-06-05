import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfh1YVJ64Hh8w8ePg5fy0JFNh9Hdx9eus",
  authDomain: "ssebd-cb9e8.firebaseapp.com",
  databaseURL: "https://ssebd-cb9e8-default-rtdb.firebaseio.com",
  projectId: "ssebd-cb9e8",
  storageBucket: "ssebd-cb9e8.appspot.com",
  messagingSenderId: "569484499742",
  appId: "1:569484499742:web:809038a4e03e282bbc070f",
  measurementId: "G-W3RENCHERS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore  = getFirestore(app);

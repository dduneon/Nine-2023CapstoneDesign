import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, query } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBclGOH29Q-jDGjRbxOpDgv0XzRJj8Zn48",
  authDomain: "nine-f2a0b.firebaseapp.com",
  projectId: "nine-f2a0b",
  storageBucket: "nine-f2a0b.appspot.com",
  messagingSenderId: "78772924392",
  appId: "1:78772924392:web:af5d0851babe31ef487e5d",
  measurementId: "G-4GPH2YRV9K",
};

initializeApp(firebaseConfig);

export const db = getDatabase();

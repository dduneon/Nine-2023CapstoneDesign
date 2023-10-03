import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, query } from 'firebase/database';

const apiKey = process.env.FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: 'AIzaSyBiO0oy1c7gwlThIN_YrF-6lRVqHD_s42U',
  authDomain: 'nine-185dc.firebaseapp.com',
  databaseURL: 'https://nine-185dc-default-rtdb.firebaseio.com',
  projectId: 'nine-185dc',
  storageBucket: 'nine-185dc.appspot.com',
  messagingSenderId: '409930738037',
  appId: '1:409930738037:web:a65c03b7e8b1603bae8b3c',
  measurementId: 'G-ZSMF2NKM0Q',
};

initializeApp(firebaseConfig);

export const db = getDatabase();

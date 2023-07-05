import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, query } from 'firebase/database';

const apiKey = process.env.FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'nine-d621e.firebaseapp.com',
  projectId: 'nine-d621e',
  storageBucket: 'nine-d621e.appspot.com',
  messagingSenderId: '760683318872',
  appId: '1:760683318872:web:38a37e47c3906e795d042d',
  measurementId: 'G-QL3WX0DT82',
};

initializeApp(firebaseConfig);

export const db = getDatabase();

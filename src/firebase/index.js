import { initializeApp } from 'firebase/app';

import { getAuth } from '@firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCrKscLyaDHe9Kt_9JYsjMjYATvi9CLNnM',
  authDomain: 'accurate-lien-search.firebaseapp.com',
  projectId: 'accurate-lien-search',
  storageBucket: 'accurate-lien-search.appspot.com',
  messagingSenderId: '978580864804',
  appId: '1:978580864804:web:14a7bb02d621422c90bdb1',
  measurementId: 'G-EYRDEGWPGK'
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

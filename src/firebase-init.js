import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAXTQPTvL9wAEjrAX2xVFPeuB_cbNKzytQ",
  authDomain: "vue-chat-bde65.firebaseapp.com",
  projectId: "vue-chat-bde65",
  storageBucket: "vue-chat-bde65.appspot.com",
  messagingSenderId: "435726431264",
  appId: "1:435726431264:web:3e8d0853c6daf454423845"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
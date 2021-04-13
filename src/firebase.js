import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyANnO7TZMamFqhvlZbltjxkkZYgDs4R7II",
  authDomain: "reportliy.firebaseapp.com",
  projectId: "reportliy",
  storageBucket: "reportliy.appspot.com",
  messagingSenderId: "399957180323",
  appId: "1:399957180323:web:f003a29aee912837fb6416",
  measurementId: "G-HNYNVN9YC7"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
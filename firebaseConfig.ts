import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDjJkexEL6C17jnbW1th91eOcobQG9lFUc",
  authDomain: "projetogt-6135b.firebaseapp.com",
  projectId: "projetogt-6135b",
  storageBucket: "projetogt-6135b.appspot.com",
  messagingSenderId: "565821812031",
  appId: "1:565821812031:web:aaf3664bf8a7be5036b78a",
  measurementId: "G-NJZB079LJ0"
}

firebase.initializeApp(firebaseConfig);


export default firebase;

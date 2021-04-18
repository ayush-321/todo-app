import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCix7B7Nn5w8FZTYsOl-Ry2RgMnh_fBZ6Y",
  authDomain: "todo-app-61a58.firebaseapp.com",
  projectId: "todo-app-61a58",
  storageBucket: "todo-app-61a58.appspot.com",
  messagingSenderId: "603210670690",
  appId: "1:603210670690:web:a8b83df488767ee14ba73b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export { db };

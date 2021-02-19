import firebase from "firebase";
import "firebase/storage";

const firebaseapp = firebase.initializeApp({
  apiKey: "AIzaSyBCo7RnrwOijVXpr0CWJ8Qhv-miLBCWirk",
  authDomain: "todo-af8f7.firebaseapp.com",
  projectId: "todo-af8f7",
  storageBucket: "todo-af8f7.appspot.com",
  messagingSenderId: "1001550148197",
  appId: "1:1001550148197:web:7f0251ed400132b6a94c8c",
  measurementId: "G-80PSGK9RE3"
});
const db = firebaseapp.firestore();

const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage, firebase as default };

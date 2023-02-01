// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqiK3oJs6R6WWw2Zf-gyXKKAZRv-8Dfk4",
  authDomain: "bookshelf-a6750.firebaseapp.com",
  projectId: "bookshelf-a6750",
  storageBucket: "bookshelf-a6750.appspot.com",
  messagingSenderId: "1062708913757",
  appId: "1:1062708913757:web:55b3138e314e30148b0fb4"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
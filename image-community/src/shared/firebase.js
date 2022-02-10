// import firebase from "firebase/app";
// import "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import { getDatabase} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyBzC0ptZXmMXSkQfm8B15cTeinKAalfG0g",
  authDomain: "image-community-9833e.firebaseapp.com",
  projectId: "image-community-9833e",
  storageBucket: "image-community-9833e.appspot.com",
  messagingSenderId: "80024568944",
  appId: "1:80024568944:web:6239ff0a265db6c8dae0b5",
  measurementId: "G-97C73S733S"
};



initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const authService = getAuth();
const firestore = getFirestore();
const storage = getStorage();
const realtime = getDatabase();

export {authService, apiKey, firestore, storage, realtime};


// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();

// export {auth};


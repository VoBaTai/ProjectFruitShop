// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFGGfYChbWp1rOuI5PBJELbamgs5meX_4",
  authDomain: "project-front-end-56dcf.firebaseapp.com",
  projectId: "project-front-end-56dcf",
  storageBucket: "project-front-end-56dcf.appspot.com",
  messagingSenderId: "333816315790",
  appId: "1:333816315790:web:8e971429b725502db52edf",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Khởi tạo Firestore
export const firestoreDb = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
// Khởi tạo Storage
export const storage = getStorage(firebaseApp); // Khởi tạo Storage và export

// Xuất khẩu Firestore và Storage

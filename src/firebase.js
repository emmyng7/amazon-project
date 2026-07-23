import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNQnT4Vdb_jL1ylcdojULgpOAcUHtyqss",
  authDomain: "clone-c2805.firebaseapp.com",
  projectId: "clone-c2805",
  storageBucket: "clone-c2805.firebasestorage.app",
  messagingSenderId: "1027853867770",
  appId: "1:1027853867770:web:ce7983a8e69359f3ad0743",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

console.log("Firebase initialized:", app);
console.log("API Key:", firebaseConfig.apiKey);
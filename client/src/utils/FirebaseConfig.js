import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCoS2psR9ccFt0ijTR6rzObCctfiShXYlU",
  authDomain: "video-chat-app-87673.firebaseapp.com",
  projectId: "video-chat-app-87673",
  storageBucket: "video-chat-app-87673.appspot.com",
  messagingSenderId: "896340761502",
  appId: "1:896340761502:web:1e2fbaa25cb36e69e5d48f",
  measurementId: "G-5P6B94FYL5"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
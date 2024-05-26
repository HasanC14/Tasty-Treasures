import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDkBye0mTcV33lfxOt4Mpxbq4TodRsYYuo",
  authDomain: "tasty-treasures-1403b.firebaseapp.com",
  projectId: "tasty-treasures-1403b",
  storageBucket: "tasty-treasures-1403b.appspot.com",
  messagingSenderId: "195481854667",
  appId: "1:195481854667:web:fe598e58a9e7c69274314e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {app, auth}
import { initializeApp } from "../node_modules/firebase/app";
import { getFirestore } from "../node_modules/firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAdl_7oyt_3RA0edolD2bZKJco3EcAUpTc",
    authDomain: "mate-champion.firebaseapp.com",
    projectId: "mate-champion",
    storageBucket: "mate-champion.appspot.com",
    messagingSenderId: "330192634440",
    appId: "1:330192634440:web:0e60f1ab6e0bd2a8a5ce7d",
};
const app = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(app);

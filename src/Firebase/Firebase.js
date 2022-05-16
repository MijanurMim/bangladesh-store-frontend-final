// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
import { getAuth } from "@firebase/auth";
import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyCyxt0xwyVDRIzn6waHP-Ls9mhAv-O31Gs',
//   authDomain: 'mizanvaiecom.firebaseapp.com',
//   projectId: 'mizanvaiecom',
//   storageBucket: 'mizanvaiecom.appspot.com',
//   messagingSenderId: '610440062051',
//   appId: '1:610440062051:web:dc24696ad75bdd5da7c456',
//   measurementId: 'G-M2F6F7VZ5T',
// }
// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
// export const auth = getAuth(app)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD484qlZgws87sgF5SRPuRS8EGy65ehfoo",
  authDomain: "bangladesh-store-final.firebaseapp.com",
  projectId: "bangladesh-store-final",
  storageBucket: "bangladesh-store-final.appspot.com",
  messagingSenderId: "762508157983",
  appId: "1:762508157983:web:f413b837e6df13e518612a",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

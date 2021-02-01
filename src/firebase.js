import firebase from "firebase";

const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyDpLqGDX_44NqkTR-oLKPkPzR9HdFDhZMA",
    authDomain: "insta-clone-890fd.firebaseapp.com",
    databaseURL: "https://insta-clone-890fd-default-rtdb.firebaseio.com",
    projectId: "insta-clone-890fd",
    storageBucket: "insta-clone-890fd.appspot.com",
    messagingSenderId: "498785557125",
    appId: "1:498785557125:web:fe2faabf1f1baefe0167ec",
    measurementId: "G-0YJS0N1YMY"
});

const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();

export {db, auth, storage};
  
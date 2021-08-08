import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "IOBAV923al2cOmQKAqEtVjwxplcUA0AzbrwasaXe",
  authDomain: "m6-sofi.firebaseapp.com",
  databaseURL: "https://m6-sofi-default-rtdb.europe-west1.firebasedatabase.app",
});

const rtdb = firebase.database();

export { rtdb };

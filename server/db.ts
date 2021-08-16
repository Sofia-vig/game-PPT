import * as admin from "firebase-admin";

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://m6-sofi-default-rtdb.europe-west1.firebasedatabase.app",
});

const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };

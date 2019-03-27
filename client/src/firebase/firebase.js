import firebase from "firebase";

// Initialize Firebase

var config = {
  apiKey: "AIzaSyDsTfoE5WBW-_dy-OKoMSukGQQPtFRRHzU",
  authDomain: "project-ivy.firebaseapp.com",
  databaseURL: "https://project-ivy.firebaseio.com",
  projectId: "project-ivy",
  storageBucket: "project-ivy.appspot.com",
  messagingSenderId: "179496064609"
};
firebase.initializeApp(config);

export default firebase.auth();

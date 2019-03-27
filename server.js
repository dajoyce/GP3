// Initialize Firebase
const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

var config = {
  apiKey: "AIzaSyDsTfoE5WBW-_dy-OKoMSukGQQPtFRRHzU",
  authDomain: "project-ivy.firebaseapp.com",
  databaseURL: "https://project-ivy.firebaseio.com",
  projectId: "project-ivy",
  storageBucket: "project-ivy.appspot.com",
  messagingSenderId: "179496064609"
};
firebase.initializeApp(config);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

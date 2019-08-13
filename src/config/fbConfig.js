import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDZF6ShCG3rHyb1x0ibWi3MqAFDH95xUhE",
  authDomain: "yao-react-redix.firebaseapp.com",
  databaseURL: "https://yao-react-redix.firebaseio.com",
  projectId: "yao-react-redix",
  storageBucket: "",
  messagingSenderId: "691516237450",
  appId: "1:691516237450:web:de656c1fc2dde18f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampsInSnapshots: true });    // It's default settings now

export default firebase;
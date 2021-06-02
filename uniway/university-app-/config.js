import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyCzRXzIh-_Rr1S3-TMEUchTWFs0It16BGA",
  authDomain: "university-app-badad.firebaseapp.com",
  projectId: "university-app-badad",
  storageBucket: "university-app-badad.appspot.com",
  messagingSenderId: "440444858937",
  appId: "1:440444858937:web:5f4b4458c3ce88b77cd3e8"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();


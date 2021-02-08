const firebaseConfig = {
    apiKey: "AIzaSyAkm6gCOG3DlzlgkV8Qd_RDEeEM2F-XmF8",
    authDomain: "projeto2-2abce.firebaseapp.com",
    projectId: "projeto2-2abce",
    storageBucket: "projeto2-2abce.appspot.com",
    messagingSenderId: "961190767075",
    appId: "1:961190767075:web:4d9983c59b98213443d8d6"
  };

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
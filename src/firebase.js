import firebase from "firebase/app";
import "firebase/auth"; 


  // Your web app's Firebase configuration
  const config  =  
  {
    apiKey: "",
    authDomain: "site-ecommerce-98bf9.firebaseapp.com",
    projectId: "site-ecommerce-98bf9",
    storageBucket: "site-ecommerce-98bf9.appspot.com",
    messagingSenderId: "510671516710",
    appId: "1:510671516710:web:bd8d4266ce1f490a35e2e7"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  export const auth= firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

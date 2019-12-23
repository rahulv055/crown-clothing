import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyDovpjlVSXYgsLcROVyEZlQv9cVq6PaRFQ",
  authDomain: "crown-clothing-db-bbc3b.firebaseapp.com",
  databaseURL: "https://crown-clothing-db-bbc3b.firebaseio.com",
  projectId: "crown-clothing-db-bbc3b",
  storageBucket: "crown-clothing-db-bbc3b.appspot.com",
  messagingSenderId: "744186944862",
  appId: "1:744186944862:web:94a43ce345ffd4608943cf",
  measurementId: "G-KHJVF12YE1"
};

export const createUserProfileDocument = async (userAuth,additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if(!snapshot.exists){
    const {displayName,email} = userAuth;
    const creatAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        creatAt,
        ...additionalData
      })
    }catch(error){
      console.log("error creating user",error);
    }

  }

  return userRef;
}
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider =  new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
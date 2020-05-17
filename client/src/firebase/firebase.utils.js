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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const creatAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        creatAt,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user", error);
    }

  }

  return userRef;
}

export const addCollectionAndDocument = async (collectionsKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionsKey);
  console.log(collectionRef);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

export const collectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(docs => {
    const { title, items } = docs.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docs.id,
      title,
      items
    }
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

firebase.initializeApp(config);


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(userAuth => {
      unsubscribeFromAuth();
      resolve(userAuth)
    }, reject)
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
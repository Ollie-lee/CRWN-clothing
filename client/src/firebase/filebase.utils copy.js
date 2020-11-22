import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBqEx7GqqmsZEf3g2GfmKQ_qvaU-WROiTE',
  authDomain: 'crwn-db-9eca7.firebaseapp.com',
  databaseURL: 'https://crwn-db-9eca7.firebaseio.com',
  projectId: 'crwn-db-9eca7',
  storageBucket: 'crwn-db-9eca7.appspot.com',
  messagingSenderId: '739054828973',
  appId: '1:739054828973:web:92f537751add89b4423524',
  measurementId: 'G-6E5X772YLV',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // user sign out
  //when user sign in, query inside a fire store for the document to see if it already
  //exists
  const userRef = firestore.doc(`users/${userAuth.uid}`); // query reference
  const snapShot = await userRef.get(); //snapshot

  //if user doesn't exist, we want to actually create a piece of data
  //we create it using user ref
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('createUserProfileDocument -> error', error.message);
    }
  }

  // we might still want the user reference
  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // objectsToAdd: [{},{},{}]
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.map((obj) => {
    const newDocRef = collectionRef.doc(); //let firestore generate a random doc ref for us
    //instead of newDocRef.set(), we use batch
    batch.set(newDocRef, obj);
  });
  return await batch.commit(); // fire all batch set() and returns a promise, resolved as null if successful
};

export const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
  //convert a collection snapshot to a normalized map {identifier:{},identifier:{},identifier:{}}
  const transformedCollection = collectionsSnapshot.docs.map(
    (documentSnapshot) => {
      const { title, items } = documentSnapshot.data();

      return {
        routeName: encodeURI(title.toLowerCase()), //convert a string to a url identifiable string
        id: documentSnapshot.id,
        title,
        items,
      };
    }
  );

  //normalization: [{},{},{}] => {identifier:{},identifier:{},identifier:{}}
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.routeName] = collection;
    return accumulator;
  }, {});
};
// Google authentication
const provider = new firebase.auth.GoogleAuthProvider();
//we want to always trigger the Google pop up when ever we use this Google auth
//provider for authentication and sign in
provider.setCustomParameters({ prompt: 'select_account' });

//pass google provider popup (other popup like twitter)
export const signInWithGoogle = () => auth.signInWithPopup(provider);

//in case we want the whole library.
export default firebase;

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//------------------CONFIG
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

//this will make sure calling firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

//-------------AUTHENTICATION---------------
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
//we want to always trigger the google pop-up whenever we use the Googleauth
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// sagas expect promise
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscibe = auth.onAuthStateChanged((userAuth) => {
      unsubscibe();
      resolve(userAuth);
    }, reject);
  });
};

//-----------MOVING OUR DATA TO THE FIREBASE---------------
//we need to call this func somewhere that will be call only once, app.js

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // creates a collection in firebase. this gives us a ref object
  const collectionRef = firestore.collection(collectionKey);
  // when we add a data to firebase we call collectionRef.set(objectHere)
  // but in firestore we can make only only 1 collectionRef.set() at a time
  // so we cannot set an array of objects with set() at the same time.
  // we can keep calling set(), but if internet connection stops half way through, our code will save only some of the documents.
  // this is bad because our code will be unpredictable. now you gotta check each document to see which one is saved.
  // with BATCH if any of them fail, whole thing will fail.
  // BATCH groups all of our calls into one Request
  const batch = firestore.batch();
  // "batch" is an object and we are adding properties to this object
  objectsToAdd.forEach((obj) => {
    // forEach does not return anything. it just executes the code
    // we want a new firebase reference, which includes an id.
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

//we want to store our data as object, so we convert it after we fetch it from firestore
export const convertCollectionSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

//this is a special function that takes the user object from google.
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const collectionRef = firestore.collection("users");
  const snapShot = await userRef.get();
  const collectionSnapshot = await collectionRef.get();
  console.log(collectionSnapshot);
  //we check if this user exists in the database or not. if not we create a new one
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    //there is async request so we use try/catch block
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (e) {
      console.error("error at creating user", e.message);
    }
  }
  return userRef;
  //next step we need to store in our state
};

export default firebase;

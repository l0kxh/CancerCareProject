// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import {  getReactNativePersistence, initializeAuth} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC80kLK7x0e2hCfxXtmdS24TuJpyrocTT0",
  authDomain: "cancer-care-840af.firebaseapp.com",
  projectId: "cancer-care-840af",
  storageBucket: "cancer-care-840af.appspot.com",
  messagingSenderId: "747058425697",
  appId: "1:747058425697:web:61c85725693cbbaec2df20",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {persistence:getReactNativePersistence(AsyncStorage)});
const db = getFirestore(app);
const storage = getStorage(app);
// Initialize Firebase
export {app, auth, db, storage};

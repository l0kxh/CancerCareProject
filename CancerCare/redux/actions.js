import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const CHECK_LOGIN = "CHECK_LOGIN";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SIGNUP = "SIGNUP";
export const GET_DATA = "GET_DATA";
export const DARK_MODE = "DARK_MODE";
export const ADD_PREDICTION = "ADD_PREDICTION";

export const toggleDarkMode = () => {
  return async (dispatch) => {
    return dispatch({
      type: DARK_MODE,
    });
  };
};

const showAlert = (heading, message) => {
  Alert.alert(heading, message, [{ text: "OK" }]);
};

export const checkIfLogin = () => {
  return async (dispatch) => {
    onAuthStateChanged(auth, async (user) => {
      const data = await AsyncStorage.getItem("user");
      const usr = JSON.parse(data);
      if (user != null) {
        const prediction = await AsyncStorage.getItem("prediction");
        const pred = JSON.parse(prediction);
        return dispatch({
          type: CHECK_LOGIN,
          payload: user,
          user: usr,
          prediction: pred,
        });
      } else {
        console.log("user not loggedin");
      }
    });
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({
        type: LOGIN,
        payload: userCredential.user,
      });
      return userCredential.user;
    } catch (err) {
      console.log(err.code);
      switch (err.code) {
        case "auth/invalid-credential":
          showAlert("Login Failed", "Please enter a valid email or password.");
          break;
        default:
          showAlert("Login Failed", "Login failed. Please try again.");
      }
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut();
    console.log("logged out success fully");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("prediction");
    dispatch({
      type: LOGOUT,
    });
  };
};

export const signUp = (username, fullName, email, password) => {
  return async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: username,
        fullname: fullName,
        email: email,
      });
      dispatch({
        type: SIGNUP,
        payload: userCredential.user,
      });
      return userCredential.user;
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          showAlert(
            "Singup Failed.",
            "This email is already registered. Please login or use another email."
          );
      }
    }
  };
};

export const getData = (uid) => {
  return async (dispatch) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await AsyncStorage.setItem("user", JSON.stringify(docSnap.data()));
      await AsyncStorage.setItem(
        "prediction",
        JSON.stringify(docSnap.data()?.prediction)
      );
      return dispatch({
        type: GET_DATA,
        payload: docSnap.data(),
      });
    }
  };
};

export const addPredction = (uid, predictions, prediction, imageUrl) => {
  return async (dispatch) => {
    const docRef = doc(db, "users", uid);
    console.log(imageUrl);
    if(predictions===null){
      predictions = []
    }
    await updateDoc(docRef, {
      prediction: [...predictions, { ...prediction, imageUrl: imageUrl }],
    });
    await AsyncStorage.setItem(
      "prediction",
      JSON.stringify([...predictions, { ...prediction, imageUrl: imageUrl }])
    )
      .then((res) => {
        return dispatch({
          type: ADD_PREDICTION,
          payload: [...predictions, { ...prediction, imageUrl: imageUrl }],
        });
      })
      .catch((err) => console.log(err));
  };
};

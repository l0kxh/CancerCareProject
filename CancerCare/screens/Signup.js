import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { LoginComponent } from "../components/LoginComponent";
import { db } from "../firebase";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { getData, signUp } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";

const validateUsername = (username) => {
  return username.length >= 6;
};
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const validatePassword = (password) => {
  return password.length >= 6;
};
const validateFullName = (fullName) => {
  return fullName.length > 0;
};
const Signup = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const signup = async() => dispatch(signUp(username, fullName, email, password));
  const getdata = async (uid) => dispatch(getData(uid));
  const { isLogin} = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const isUserNameTaken = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => console.log(doc.data()));
      return !querySnapshot.empty;
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegister = async () => {
    setIsLoading(true);
    if (!validateUsername(username)) {
      setUsernameError("Username must be atleast 6 letters.");
      setIsLoading(false);
      return;
    } else {
      setUsernameError("");
    }
    const userNameTaken = await isUserNameTaken();
    if (userNameTaken) {
      setIsLoading(false);
      setUsernameError("This username isn't available. Please try another.");
      return;
    } else {
      setUsernameError("");
    }
    if (!validateFullName(fullName)) {
      setIsLoading(false);
      setFullNameError("Name should not be empty.");
      return;
    } else {
      setFullNameError("");
    }
    if (!validateEmail(email)) {
      setIsLoading(false);
      setEmailError("Please enter a valid email.");
      return;
    } else {
      setEmailError("");
    }
    if (!validatePassword(password)) {
      setIsLoading(false);
      setPasswordError("Password should be atleast 6 letters.");
      return;
    } else {
      setPasswordError("");
    }
    const data = await signup();
    if (data != null) {
      await getdata(data?.uid);
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate("home");
      }, 2000);
    } else {
      setIsLoading(false);
    }
  };
  return (
    <ScrollView>
      {LoginComponent()}
      <Spinner visible={isLoading} />
      <View
        style={{
          paddingHorizontal: "10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "500", marginBottom: 5, fontFamily:"NunitoBold"}}>
          Create Account
        </Text>
        <Text style={{ color: "gray",fontFamily:"NunitoRegular" }}> Enter your profile details</Text>
        <TextInput
          placeholder="Enter your username"
          placeholderTextColor={"gray"}
          onChangeText={(e) => setUsername(e)}
          value={username}
          style={{
            borderWidth: 0.5,
            borderColor: "#d3d3d3",
            width: "100%",
            height: 50,
            borderRadius: 10,
            padding: 10,
            marginTop: 20,
            fontFamily:"NunitoRegular"
          }}
        />
        {usernameError.length != 0 && (
          <Text style={{ color: "red", marginLeft: 2,fontFamily:"NunitoRegular" }}>{usernameError}</Text>
        )}
        <TextInput
          placeholder="Enter your full name"
          placeholderTextColor={"gray"}
          onChangeText={(e) => setFullName(e)}
          value={fullName}
          style={{
            borderWidth: 0.5,
            borderColor: "#d3d3d3",
            width: "100%",
            height: 50,
            borderRadius: 10,
            padding: 10,
            marginTop: 20,
            fontFamily:"NunitoRegular"
          }}
        />
        {fullNameError && (
          <Text style={{ color: "red", marginLeft: 2,fontFamily:"NunitoRegular" }}>{fullNameError}</Text>
        )}
        <TextInput
          placeholder="Enter your email address"
          placeholderTextColor={"gray"}
          onChangeText={(e) => setEmail(e)}
          value={email}
          style={{
            borderWidth: 0.5,
            borderColor: "#d3d3d3",
            width: "100%",
            height: 50,
            borderRadius: 10,
            padding: 10,
            marginTop: 20,
            fontFamily:"NunitoRegular"
          }}
        />
        {emailError && (
          <Text style={{ color: "red", marginLeft: 2,fontFamily:"NunitoRegular" }}>{emailError}</Text>
        )}
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor={"gray"}
          onChangeText={(e) => setPassword(e)}
          value={password}
          secureTextEntry
          style={{
            borderWidth: 0.5,
            borderColor: "#d3d3d3",
            width: "100%",
            height: 50,
            borderRadius: 10,
            padding: 10,
            marginTop: 20,
            fontFamily:"NunitoRegular"
          }}
        />
        {passwordError && (
          <Text style={{ color: "red", marginLeft: 2,fontFamily:"NunitoRegular" }}>{passwordError}</Text>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "#1ABC9C",
            paddingVertical: 10,
            borderRadius: 25,
            paddingHorizontal: 20,
            marginTop: 20,
          }}
          onPress={() => handleRegister()}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "500",
              textAlign: "center",
              fontFamily:"NunitoExtraBold"
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 15,
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <Text style={{ fontSize: 16, marginLeft: 3, fontFamily:"NunitoRegular" }}>
            Have have account?
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('login')}>
            <Text
              style={{
                color: "#1ABC9C",
                fontSize: 18,
                marginLeft: 5,
                fontFamily:"NunitoBold"
              }}
            >
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

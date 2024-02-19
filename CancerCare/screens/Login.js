import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { getData, signIn } from "../redux/actions";
import { LoginComponent } from "../components/LoginComponent";
import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "../firebase";
import Spinner from "react-native-loading-spinner-overlay";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const validatePassword = (password) => {
  return password.length >= 6;
};
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const { Auth, user } = useSelector((state) => state.userReducer);
  const login = async (email, password) => dispatch(signIn(email, password));
  const getdata = async (uid) => dispatch(getData(uid));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    } else {
      setEmailError("");
    }
    if (!validatePassword(password)) {
      setPasswordError("Password must be at lease 6 characters.");
      setIsLoading(false);
      return;
    } else {
      setPasswordError("");
    }
    const data = await login(email, password);
    if (data != null) {
      setTimeout(async()=>{
        await getdata(data?.uid);
        setEmail("");
        setPassword("");
        setIsLoading(false);
        navigation.navigate("home")
      }, 2000)
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // navigation.addListener("beforeRemove", (e) => {
    //   e.preventDefault();
    // });
  }, [navigation]);
  const handleForgotPassword = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return;
    } else {
      setEmailError("");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Email sent.",
          "Password reset link will be sent to the email if registered."
        );
      })
      .catch((err) => console.log(email));
  };
  return (
    <ScrollView>
      <Spinner visible={isLoading} />
      {LoginComponent()}
      <View
        style={{
          paddingHorizontal: "10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{ fontSize: 30, fontFamily: "NunitoBold", marginBottom: 5 }}
        >
          Log into your account
        </Text>
        <Text style={{ color: "gray", fontFamily: "NunitoRegular" }}>
          {" "}
          Enter your login details
        </Text>
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
            marginTop: 25,
            fontFamily: "NunitoRegular",
          }}
        />
        {emailError.length != 0 && (
          <Text
            style={{ color: "red", marginLeft: 2, fontFamily: "NunitoRegular" }}
          >
            {emailError}
          </Text>
        )}
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor={"gray"}
          secureTextEntry
          onChangeText={(e) => setPassword(e)}
          value={password}
          style={{
            borderWidth: 0.5,
            borderColor: "#d3d3d3",
            width: "100%",
            height: 50,
            borderRadius: 10,
            padding: 10,
            marginTop: 25,
            fontFamily: "NunitoRegular",
          }}
          onSubmitEditing={() => handleLogin()}
        />
        {passwordError.length != 0 && (
          <Text
            style={{ color: "red", marginLeft: 2, fontFamily: "NunitoRegular" }}
          >
            {passwordError}
          </Text>
        )}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            marginVertical: 20,
          }}
        >
          <Text
            style={{ fontSize: 16, marginLeft: 3, fontFamily: "NunitoRegular" }}
          >
            Forgot Password?
          </Text>
          <TouchableOpacity onPress={() => handleForgotPassword()}>
            <Text
              style={{
                color: "#1ABC9C",
                fontSize: 16,
                marginLeft: 10,
                fontFamily: "NunitoBold",
              }}
            >
              Click Here
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleLogin()}
          style={{
            backgroundColor: "#1ABC9C",
            paddingVertical: 10,
            borderRadius: 25,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              textAlign: "center",
              fontFamily: "NunitoExtraBold",
            }}
          >
            Log in
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <Text
            style={{ fontSize: 16, marginLeft: 3, fontFamily: "NunitoRegular" }}
          >
            Don't have account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text
              style={{
                color: "#1ABC9C",
                fontSize: 18,
                marginLeft: 5,
                fontFamily: "NunitoBold",
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

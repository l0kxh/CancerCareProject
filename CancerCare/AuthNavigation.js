import React, { useEffect, useRef, useState } from "react";
import Route from "./Route";
import { useDispatch, useSelector } from "react-redux";
import { checkIfLogin } from "./redux/actions";
import { View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { NavigationContainer } from "@react-navigation/native";

const AuthNavigation = () => {
  const { isLogin } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const checkLogin = async() => dispatch(checkIfLogin());
  useEffect(() => {
    checkLogin();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return loading ? (
    <View style={{ backgroundColor: "#000", flex: 1 }}>
      <Spinner visible={loading} />
    </View>
  ) : (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
};

export default AuthNavigation;

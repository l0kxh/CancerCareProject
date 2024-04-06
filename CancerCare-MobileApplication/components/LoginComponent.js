import { View, Text, Dimensions } from "react-native";
import React from "react";
import Lottie from "lottie-react-native";
export const LoginComponent = () => {
  return (
    <Lottie
      source={require("../assets/login.json")}
      style={{
        height: Dimensions.get("screen").height / 2.2,
        width: Dimensions.get("screen").width / 1.6,
        opacity: 0.9,
        alignSelf: "center",
        transform: [{ scale: 1.5 }],
      }}
      autoPlay
      loop
    />
  );
};

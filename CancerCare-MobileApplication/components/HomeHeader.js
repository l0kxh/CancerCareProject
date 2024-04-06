import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import { Platform } from "react-native";
import { View, Text, Image, TextInput } from "react-native";
import { useSelector } from "react-redux";

const HomeHeader = ({ onSearch, navigation }) => {
  const { darkMode } = useSelector((state) => state.userReducer);
  return (
    <View
      style={{
        paddingTop:
          Platform.OS === "android" ? StatusBar.currentHeight + 12 : 12,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "auto",
        backgroundColor: darkMode ? "#1a1a1a" : "#fff",
        elevation: 20,
      }}
    >
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Image
          source={require("../assets/logo3.png")}
          resizeMode="contain"
          style={{ width: 35, height: 35 }}
        />
        <Text
          style={{
            fontSize: 28,
            paddingLeft: 10,
            color: darkMode ? "#fff" : "#000",
            fontFamily:"NunitoBold"
          }}
        >
          Cancer Care
        </Text>
      </View>
    </View>
  );
};

export default HomeHeader;

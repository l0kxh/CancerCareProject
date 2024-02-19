import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export const TabBar = ({ scrollY }) => {
  const { darkMode } = useSelector((state) => state.userReducer);
  const translateY = Animated.diffClamp(scrollY, 0, 100).interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolateRight: "clamp",
  });
  const navigation = useNavigation();
  const [currentScreen, setCurrentScreen] = useState("home");
  return (
    <Animated.View
      style={[
        styles.mainContainer,
        {
          transform: [{ translateY }],
          backgroundColor: darkMode ? "#1a1a1a" : "#f6f6f6",
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.mainItemContainer,
          currentScreen === "home" && { transform: [{ scale: 1.1 }] },
        ]}
        onPress={() => {
          setCurrentScreen("home");
          navigation.navigate("home");
        }}
      >
        <MaterialCommunityIcons
          name={"home"}
          size={30}
          color={darkMode ? "#fff" : "#000"}
        />
        <Text
          style={{
            fontSize: 13,
            fontWeight: "400",
            color: darkMode ? "#fff" : "#000",
            fontFamily:"NunitoBold"
          }}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.mainItemContainer,
          currentScreen === "hospitals" && { transform: [{ scale: 1.1 }] },
        ]}
        onPress={() => {
          setCurrentScreen("hospitals");
          navigation.navigate("hospitals");
        }}
      >
        <MaterialCommunityIcons
          name={"hospital-marker"}
          size={30}
          color={darkMode ? "#fff" : "#000"}
        />
        <Text
          style={{
            fontSize: 13,
            fontWeight: "400",
            color: darkMode ? "#fff" : "#000",
            fontFamily:"NunitoBold"
          }}
        >
          Hospitals
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.mainItemContainer,
          currentScreen === "detect" && { transform: [{ scale: 1.1 }] },
        ]}
        onPress={() => {
          setCurrentScreen("detect");
          navigation.navigate("detect");
        }}
      >
        <MaterialCommunityIcons
          name={"google-analytics"}
          size={30}
          color={darkMode ? "#fff" : "#000"}
        />
        <Text
          style={{
            fontSize: 13,
            color: darkMode ? "#fff" : "#000",
            fontFamily:"NunitoBold"
          }}
        >
          Detect
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.mainItemContainer,
          currentScreen === "more" && { transform: [{ scale: 1.1 }] },
        ]}
        onPress={() => {
          setCurrentScreen("more");
          navigation.navigate("more");
        }}
      >
        <MaterialCommunityIcons
          name={"dots-horizontal-circle"}
          size={30}
          color={darkMode ? "#fff" : "#000"}
        />
        <Text
          style={{
            fontSize: 13,
            fontWeight: "400",
            color: darkMode ? "#fff" : "#000",
            fontFamily:"NunitoBold"
          }}
        >
          More
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    elevation: 10,
    zIndex: 999,
    paddingBottom: 5,
  },
  mainItemContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
});

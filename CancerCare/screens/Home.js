import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import { useSelector } from "react-redux";
import { TabBar } from "./TabBar";
const Home = ({ navigation, scrollY }) => {
  const { darkMode } = useSelector((state) => state.userReducer);
  const [styles, setStyles] = useState(getStyles(darkMode));
  useEffect(() => {
    setStyles(getStyles(darkMode));
  }, [darkMode]);
  return (
    <View
      style={{ backgroundColor: darkMode ? "#000" : "#f6f6f6", height: "100%" }}
    >
      <HomeHeader navigation={navigation} />
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={{ marginVertical: 40, paddingHorizontal: 20 }}>
          <Text style={styles.headerLine}>Explore, Learn, Defeat</Text>
          <Text style={styles.headerLine}>Unveiling the World of Cancer.</Text>
        </View>
        <View style={styles.cancerContainer}>
          <TouchableOpacity
            style={[styles.cancerBoxContainer, { backgroundColor: "#F3A153" }]}
            onPress={()=>navigation.navigate('cancertoday')}
          >
            <Text style={styles.cancerBoxHeader}>CANCER</Text>
            <Text style={styles.cancerBoxText}>TODAY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cancerBoxContainer, { backgroundColor: "#25528F" }]}
          >
            <Text style={styles.cancerBoxHeader}>CANCER</Text>
            <Text style={styles.cancerBoxText}>TOMORROW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cancerBoxContainer, { backgroundColor: "#16B578" }]}
          >
            <Text style={styles.cancerBoxHeader}>CANCER</Text>
            <Text style={styles.cancerBoxText}>CAUSES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancerBoxContainer}>
            <Text
              style={{
                fontSize: 35,
                color: "#fff",
                fontFamily: "NunitoExtraBold",
              }}
            >
              CANCER
            </Text>
            <Text style={styles.cancerBoxText}>SURVIVAL</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
};
const getStyles = (darkMode) => {
  return StyleSheet.create({
    cancerBoxContainer: {
      height: 160,
      width: 160,
      backgroundColor: "#934D9E",
      margin: 10,
      borderRadius: 25,
      padding: 15,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      elevation: 4,
    },
    cancerBoxHeader: {
      fontSize: 35,
      color: "#fff",
      fontFamily: "NunitoExtraBold",
    },
    cancerBoxText: {
      fontSize: 25,
      fontFamily: "NunitoExtraBold",
      color: "#000",
    },
    cancerContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    },
    headerLine: {
      color: darkMode ? "#fff" : "#000",
      fontSize: 30,
      fontWeight: "600",
      fontFamily: "NunitoBold",
    },
  });
};
export default Home;

import { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Animated } from "react-native";
import { useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
export const BottomGroupMaps = ({ toggleLayer, getLocation }) => {
  const { darkMode } = useSelector((state) => state.userReducer);
  const animationValue = useRef(new Animated.Value(60)).current;
  const [expanded, setExpanded] = useState(false);
  const [styles, setStyles] = useState(getStyles(darkMode));
  const toggleExpansion = () => {
    const targetHeight = expanded ? 60 : 160;
    Animated.timing(animationValue, {
      toValue: targetHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };
  useEffect(() => {
    setStyles(getStyles(darkMode));
    let timeoutId;
    if (expanded) {
      timeoutId = setTimeout(() => {
        toggleExpansion();
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [expanded, darkMode]);
  return (
    <Animated.View
      style={[styles.buttonGroupContainer, { height: animationValue }]}
    >
      {expanded && (
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={() => toggleLayer()}>
            <MaterialCommunityIcons
              color={darkMode ? "#fff" : "#1a1a1a"}
              size={30}
              name="layers-outline"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              getLocation();
            }}
          >
            <MaterialCommunityIcons
              color={darkMode ? "#fff" : "#1a1a1a"}
              size={30}
              name="crosshairs-gps"
            />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={() => toggleExpansion()}>
        <MaterialIcons
          size={30}
          color={darkMode ? "#fff" : "#1a1a1a"}
          name={expanded ? "keyboard-arrow-down" : "keyboard-arrow-up"}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const getStyles = (darkMode) => {
  return StyleSheet.create({
    buttonGroupContainer: {
      position: "absolute",
      bottom: 100,
      right: 15,
      width: 60,
      overflow: "hidden",
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
      backgroundColor: darkMode ? "#1a1a1a" : "#fff",
      elevation:4
    },
    buttonGroup: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      height: "65%",
    },
  });
};

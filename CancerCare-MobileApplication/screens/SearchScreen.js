import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SearchBar } from "../components/SearchBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SearchScreen = ({
  suggestions,
  setLocation,
  getHospitals,
  setSearchScreen,
}) => {
  const { darkMode } = useSelector((state) => state.userReducer);
  const [styles, setStyles] = useState(getStyles(darkMode));
  useEffect(() => {
    setStyles(getStyles(darkMode));
  }, [darkMode]);
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.suggestionsContainer}>
        {suggestions?.map((item, index) => (
          <SuggestionComponent
            key={index}
            suggestion={item}
            darkMode={darkMode}
            setLocation={setLocation}
            getHospitals={getHospitals}
            setSearchScreen={setSearchScreen}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const SuggestionComponent = ({
  suggestion,
  darkMode,
  setLocation,
  getHospitals,
  setSearchScreen,
}) => {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: 20,
      }}
      onPress={async () => {
        await setLocation({
          longitude: suggestion.geometry.coordinates[0],
          latitude: suggestion.geometry.coordinates[1],
        });
        setSearchScreen(false);
        await getHospitals(
          1000,
          suggestion.geometry.coordinates[1],
          suggestion.geometry.coordinates[0]
        );
      }}
    >
      <View style={{}}>
        <MaterialIcons
          color={darkMode ? "#d3d3d3" : "#1a1a1a"}
          size={30}
          name="location-on"
        />
      </View>
      <View style={{ marginLeft: 25 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: darkMode ? "#fff":"#000", fontFamily: "NunitoBold", fontSize: 16 }}
        >
          {suggestion.properties?.name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{color: darkMode ? "#fff":"#000", fontFamily: "NunitoLight", fontSize: 14 }}
        >
          {suggestion.properties?.county &&
            suggestion.properties?.county + ", "}
          {suggestion.properties?.state && suggestion.properties?.state + ", "}
          {suggestion.properties?.country}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const getStyles = (darkMode) => {
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: darkMode ? "#1a1a1a" : "#f4f4f4",
      height: "100%",
    },
    suggestionsContainer: {
      marginTop: "25%",
      marginBottom: 60,
    },
  });
};
export default SearchScreen;

import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import axios from "axios";
export const SearchBar = ({
  setLocation,
  getHospitals,
  navigation,
  changeSearchScreen,
  searchScreen,
  handleSuggestions,
}) => {
  const {darkMode} = useSelector(state=>state.userReducer);
  const [address, setAddress] = useState("");
  const [styles, setStlyes] = useState(getStlyes(darkMode));
  const apiKey = "83de4da3eab34fc2a6524fe28557ca9a";
  const handlePress = () => {
    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        address
      )}&apiKey=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLocation({
          longitude: data?.features[0]?.geometry?.coordinates[0],
          latitude: data?.features[0]?.geometry?.coordinates[1],
        });
        getHospitals(
          1000,
          data?.features[0]?.geometry?.coordinates[1],
          data?.features[0]?.geometry?.coordinates[0]
        );
      });
  };
  useEffect(()=>{
    setStlyes(getStlyes(darkMode));
  }, [darkMode])
  const handleTextChange = async (e) => {
    if (e.length === 0) {
      handleSuggestions([]);
    } else {
      await axios
        .get(`https://photon.komoot.io/api/?q=${e}&limit=15`)
        .then((res) => {
          handleSuggestions(res.data.features);
        });
    }
  };

  return (
    <View
      onTouchEnd={() => {
        if (!searchScreen) {
          changeSearchScreen(true);
        }
      }}
      style={styles.mainContainer}
    >
      {!searchScreen ? (
        <MaterialIcons
          color={darkMode ? "#f4f4f4" : "#1a1a1a"}
          size={30}
          name="location-on"
        />
      ) : (
        <MaterialIcons
          onPress={() => changeSearchScreen(false)}
          color={darkMode ? "#f4f4f4" : "#1a1a1a"}
          size={30}
          name="arrow-back"
        />
      )}
      <TextInput
        placeholder="Search here"
        placeholderTextColor={darkMode ? "#f4f4f4" : "#1a1a1a"}
        value={address}
        onChangeText={(e) => {
          setAddress(e);
          handleTextChange(e);
        }}
        onSubmitEditing={() => handlePress()}
        style={{ width: "60%", color: darkMode ? "#f4f4f4" : "#1a1a1a" }}
        editable={searchScreen}
        autoFocus={true}
      />
      {address.length != 0 && (
        <MaterialIcons
          onPress={() => {
            setAddress("");
            handleTextChange("");
          }}
          size={20}
          name="close"
          color={darkMode ? "#e8eaed": "#1a1a1a"}
        />
      )}
      <MaterialIcons
        color={darkMode ? "#f4f4f4" : "#1a1a1a"}
        size={30}
        name="search"
      />
      <TouchableOpacity>
        <Image
          source={require("../assets/profile2.png")}
          style={{ height: 30, width: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const getStlyes = (darkMode) => {
  return StyleSheet.create({
    mainContainer: {
      height: 50,
      position: "absolute",
      width: "95%",
      top: 40,
      backgroundColor: darkMode ? "#1a1a1a" : "#f4f4f4",
      zIndex: 999,
      alignSelf: "center",
      borderRadius: 25,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      borderWidth:.2,
      borderColor:"#d3d3d3",
      elevation:4
    },
  });
};

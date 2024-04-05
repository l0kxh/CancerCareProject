import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "@rneui/base";

const HospitalsComponent = ({ item, index, darkMode, setLocation }) => {
  const [styles, setStyles] = useState(getStyles(darkMode));
  useEffect(() => {
    setStyles(getStyles(darkMode));
  }, [darkMode]);
  
  const openMaps = async (latitude, longitude, label) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving&dir_action=navigate&destination_place_id=${label}`;
    Linking.openURL(url);
  };
  return (
    <TouchableOpacity
      style={styles.hospitalContainer}
      onPress={() => {
        setLocation({
          latitude: item.lat,
          longitude: item.lon,
        });
      }}
      key={index}
    >
      <Image
        source={require("../assets/logo.jpg")}
        style={styles.hospitalImageStyle}
      />
      <View style={{ width: "60%", marginLeft: 20 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.hospitalNameStyle}
        >
          {item?.tags?.name}
        </Text>
        <Text style={styles.hosptialAmenityStyle}>{item?.tags?.amenity}</Text>
        <Text style={styles.hospitalAddressStyle}>
          {item?.tags["addr:full"]}
        </Text>
        <Text style={styles.hospitalAddressStyle}>
          {item?.tags["addr:district"]}
        </Text>
        <Text style={styles.hospitalAddressStyle}>
          {item?.tags["addr:postcode"]}
        </Text>
        <Button
          buttonStyle={styles.getDirectionsButtonStyle}
          title="Get Directions"
          titleStyle={styles.getDirectionsButtonTitleStyle}
          onPress={() => openMaps(item.lat, item.lon, item.tags.name)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default HospitalsComponent;

const getStyles = (darkMode) => {
  return StyleSheet.create({
    hospitalContainer: {
      paddingVertical: 15,
      marginVertical: 10,
      marginHorizontal: 5,
      paddingHorizontal: 20,
      backgroundColor: darkMode ? "#000" : "#fff",
      borderRadius: 25,
      elevation: 5,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    hospitalImageStyle: { width: 100, height: 100, borderRadius: 15 },
    hospitalNameStyle: {
      fontSize: 18,
      fontFamily: "NunitoBold",
      color: darkMode ? "#fff" : "#000",
    },
    hosptialAmenityStyle: {
      fontSize: 16,
      color: "#d3d3d3",
      fontFamily: "NunitoSemiBold",
      marginVertical: 3,
    },
    hospitalAddressStyle: {
      fontFamily: "NunitoRegular",
      color: darkMode ? "#fff" : "#000",
      marginVertical: 3,
    },
    getDirectionsButtonStyle: {
      width: 110,
      borderRadius: 25,
      padding: 10,
      backgroundColor: "#1ABC9C",
      marginVertical: 10,
      elevation:3,
    },
    getDirectionsButtonTitleStyle: { fontFamily: "NunitoBold", fontSize:16 },
  });
};

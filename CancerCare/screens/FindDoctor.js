import { View, Alert, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { BottomGroupMaps } from "../components/BottomGroupMaps";
import { SearchBar } from "../components/SearchBar";
import HospitalsComponent from "../components/HospitalsComponent";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SearchScreen from "./SearchScreen";

const FindDoctor = ({ navigation }) => {
  const { darkMode } = useSelector((state) => state.userReducer);
  const [styles, setStyles] = useState(getStyles(darkMode));
  const [searchScreen, setSearchScreen] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "50%"], []);
  const [suggestions, setSuggestions] = useState([]);
  const [region, setRegion] = useState({
    latitude: 18.3205,
    longitude: 78.337,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [location, setLocation] = useState({
    latitude: 18.3205,
    longitude: 78.337,
  });
  function handlePressModal() {
    bottomSheetModalRef.current?.present();
  }
  useEffect(() => {
    setStyles(getStyles(darkMode));
    setRegion({
      ...location,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, [location, darkMode, darkMode]);
  const [hospitals, setHospitals] = useState(null);
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    getHospitals(1000, location.coords.latitude, location.coords.longitude);
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };
  const getHospitals = async (radius, latitude, longitude) => {
    console.log(radius, longitude, latitude);
    const overpassUrl = "http://overpass-api.de/api/interpreter";
    const overpassQuery = `
    [out:json];
    node(around:${radius},${latitude},${longitude})["amenity"="hospital"];
    out;
    `;
    await axios
      .get(overpassUrl, { params: { data: overpassQuery } })
      .then((res) => {
        setHospitals(res.data.elements);
        if (res.data.elements.length === 0) {
          Alert.alert("Sorry", "There is no nearby hospitals!!");
          return;
        }
        handlePressModal();
      });
  };

  const mapCustomStyle = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];
  const [layer, setLayer] = useState(false);
  const toggleLayer = () => {
    setLayer(!layer);
  };
  const changeSearchScreen = (value) => {
    setSearchScreen(value);
  };
  const handleSuggestions = (value) => {
    setSuggestions(value);
    // console.log(value);
  };
  if (searchScreen) {
    return (
      <View>
        <SearchBar
          setLocation={setLocation}
          getHospitals={getHospitals}
          navigation={navigation}
          changeSearchScreen={changeSearchScreen}
          searchScreen={searchScreen}
          handleSuggestions={handleSuggestions}
          darkMode={darkMode}
        />
        <SearchScreen
          searchScreen={searchScreen}
          suggestions={suggestions}
          setLocation={setLocation}
          getHospitals={getHospitals}
          setSearchScreen={setSearchScreen}
        />
      </View>
    );
  }
  return (
    <View>
      <BottomSheetModalProvider>
        <SearchBar
          setLocation={setLocation}
          getHospitals={getHospitals}
          navigation={navigation}
          changeSearchScreen={changeSearchScreen}
          searchScreen={searchScreen}
          darkMode={darkMode}
        />
        <MapView
        
          customMapStyle={darkMode ? mapCustomStyle : []}
          mapType={layer ? "satellite" : "standard"}
          style={styles.map}
          region={region}
          moveOnMarkerPress
          onPress={(e) => {
            setLocation(e.nativeEvent.coordinate);
            getHospitals(
              1000,
              e.nativeEvent.coordinate.latitude,
              e.nativeEvent.coordinate.longitude
            );
          }}
        >
          {hospitals?.map((item, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: item.lat, longitude: item.lon }}
            >
              <MaterialIcons name="add-location" size={30} color={"#1ABC9C"} />
            </Marker>
          ))}
          {location && <Marker coordinate={location} />}
        </MapView>
        <BottomGroupMaps toggleLayer={toggleLayer} getLocation={getLocation} />
        <BottomSheetModal
          enablePanDownToClose={false}
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          index={0}
          backgroundStyle={styles.bottomSheetStyle}
          handleStyle={{ paddingTop: 15 }}
        >
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginBottom: 80,
            }}
          >
            {hospitals?.map((item, index) => (
              <HospitalsComponent
                item={item}
                key={index}
                index={index}
                darkMode={darkMode}
                setLocation={setLocation}
              />
            ))}
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

const getStyles = (darkMode) => {
  return StyleSheet.create({
    map: {
      height: "100%",
      width: "100%",
    },
    bottomSheetStyle: {
      borderRadius: 20,
      backgroundColor: darkMode ? "#1a1a1a" : "#f4f4f4",
    },
  });
};
export default FindDoctor;

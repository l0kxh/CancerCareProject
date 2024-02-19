import {
  View,
  Text,
  Alert,
  StatusBar,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut, toggleDarkMode } from "../redux/actions";
import { Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ImageBackground } from "react-native";
import { Button } from "@rneui/base";
const More = ({ navigation }) => {
  const { auth, user, darkMode } = useSelector((state) => state.userReducer);
  const [styles, setStyles] = useState(getStlyes(darkMode));
  const dispatch = useDispatch();
  const logout = async () => dispatch(signOut());
  const handleToggle = async () => dispatch(toggleDarkMode());
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await logout();
            navigation.navigate("login");
          },
        },
      ],
      { cancelable: false }
    );
  };
  useEffect(() => {
    setStyles(getStlyes(darkMode));
  }, [darkMode]);
  return (
    <View style={styles.MainContainer}>
      <View style={styles.userContainer}>
        <Image
          source={require("../assets/profile2.png")}
          style={styles.profileImage}
        />
        <View style={styles.userDetailContainer}>
          <Text style={styles.userNameStyle}>{user?.username}</Text>
          <Text style={styles.userEmailStyle}>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.inviteContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="group-add"
            size={30}
            color={darkMode ? "#fff" : "#000"}
          />
          <Text style={styles.inviteTextStyle}>Invite your friends</Text>
        </View>
        <ImageBackground
          source={require("../assets/invite.jpg")}
          imageStyle={{ borderRadius: 15 }}
          style={{ width: "100%", height: 150, marginTop: 10 }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
              height: 150,
              borderRadius: 15,
              padding: 15,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 24,
                fontFamily: "NunitoExtraBold",
              }}
            >
              Keeping Health
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 24,
                fontFamily: "NunitoExtraBold",
              }}
            >
              All To Yourself?
            </Text>
            <Text
              style={{ color: "#fff", fontSize: 16, fontFamily: "NunitoLight" }}
            >
              Be a yaar, Get others to{" "}
              <Text style={{ fontFamily: "NunitoExtraBold" }}>
                #CancerCareAI
              </Text>
            </Text>
            <Button
              title={"Invite Now"}
              buttonStyle={{
                width: 90,
                borderRadius: 10,
                backgroundColor: "rgba(26, 188, 156, .8)",
                marginTop: 15,
              }}
              titleStyle={{ fontFamily: "NunitoBold" }}
            />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.MenuContainer}>
        <MenuItems
          styles={styles}
          darkMode={darkMode}
          icon={"person"}
          name={"Profile"}
          handlePress={() => navigation.navigate("profile")}
        />
        <MenuItems
          styles={styles}
          darkMode={darkMode}
          icon={"history"}
          name={"Cancer Reports"}
        />
        <MenuItems
          styles={styles}
          darkMode={darkMode}
          icon={"help"}
          name={"Help & Support"}
          handlePress={()=>navigation.navigate('help')}
        />
        <TouchableOpacity
          style={[
            styles.MenuItemContainer,
            { justifyContent: "space-between", paddingVertical: 5 },
          ]}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={25}
              color={darkMode ? "#fff" : "#000"}
            />
            <Text style={styles.MenuItemText}>Dark Mode</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={darkMode ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={async () => {
              await handleToggle();
            }}
            value={darkMode}
          />
        </TouchableOpacity>
        <MenuItems
          styles={styles}
          darkMode={darkMode}
          icon={"logout"}
          name={"Logout"}
          handlePress={() => handleLogout()}
        />
      </View>
    </View>
  );
};
const MenuItems = ({ styles, darkMode, icon, name, handlePress }) => {
  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      style={[
        styles.MenuItemContainer,
        icon === "logout" && { borderBottomWidth: 0 },
      ]}
    >
      <MaterialIcons name={icon} size={25} color={darkMode ? "#fff" : "#000"} />
      <Text style={styles.MenuItemText}>{name}</Text>
    </TouchableOpacity>
  );
};
const getStlyes = (darkMode) => {
  return StyleSheet.create({
    MainContainer: {
      backgroundColor: darkMode ? "#000" : "#f4f4f4",
      height: "100%",
      paddingTop: 40,
      padding: 20,
    },
    userContainer: {
      height: "15%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    profileImage: {
      width: "25%",
      height: "120%",
      resizeMode: "contain",
    },
    userDetailContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginLeft: 20,
    },
    userNameStyle: {
      fontSize: 20,
      color: darkMode ? "#fff" : "#000",
      fontFamily: "NunitoBold",
    },
    userEmailStyle: {
      fontSize: 16,
      color: darkMode ? "#fff" : "#000",
      fontFamily: "NunitoLight",
    },
    inviteContainer: {
      backgroundColor: darkMode ? "#1a1a1a" : "#fff",
      borderRadius: 20,
      padding: 15,
      marginTop: 20,
    },
    inviteTextStyle: {
      marginLeft: 10,
      fontSize: 15,
      color: darkMode ? "#fff" : "#000",
      fontFamily: "NunitoMedium",
    },
    MenuContainer: {
      width: "100%",
      backgroundColor: darkMode ? "#1a1a1a" : "#fff",
      borderRadius: 20,
      marginTop: 30,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    MenuItemContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "grey",
    },
    MenuItemText: {
      marginLeft: 20,
      fontSize: 16,
      color: darkMode ? "#fff" : "#000",
      fontFamily: "NunitoMedium",
    },
  });
};
export default More;

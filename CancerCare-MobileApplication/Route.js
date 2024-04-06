import Dashboard, { TabBar } from "./screens/TabBar";
import React, { useEffect, useRef } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Animated, BackHandler, View } from "react-native";
import { useSelector } from "react-redux";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./screens/ProfileScreen";
import Home from "./screens/Home";
import FindDoctor from "./screens/FindDoctor";
import DetectCancer from "./screens/DetectCancer";
import More from "./screens/More";
import SearchScreen from "./screens/SearchScreen";
import CancerToday from "./screens/CancerStas/CancerToday";
import { Help } from "./screens/Help";
const Stack = createStackNavigator();
const Route = () => {
  const navigation = useNavigation();
  const { isLogin, auth } = useSelector((state) => state.userReducer);

  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isLogin ? "home" : "login"}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="profile" component={ProfileScreen} />
        <Stack.Screen name="home">
          {(props) => <Home {...props} scrollY={scrollY} />}
        </Stack.Screen>
        <Stack.Screen name="hospitals" component={FindDoctor} />
        <Stack.Screen name="detect" component={DetectCancer} />
        <Stack.Screen name="more" component={More} />
        <Stack.Screen name="cancertoday" component={CancerToday} />
        <Stack.Screen name="help" component={Help} />
      </Stack.Navigator>
      {isLogin && <TabBar scrollY={scrollY} />}
    </>
  );
};

export default Route;

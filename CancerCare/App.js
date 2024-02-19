import { Platform, StatusBar, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import AuthNavigation from "./AuthNavigation";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Spinner from "react-native-loading-spinner-overlay";
import {useFonts} from "expo-font"
export default function App() {
  const [fontsLoaded] = useFonts({
    'NunitoRegular' : require("./assets/fonts/Nunito-Regular.ttf"),
    'NunitoLight' : require("./assets/fonts/Nunito-Light.ttf"),
    'NunitoExtraLight' : require("./assets/fonts/Nunito-ExtraLight.ttf"),
    'NunitoMedium' : require("./assets/fonts/Nunito-Medium.ttf"),
    'NunitoBold' : require("./assets/fonts/Nunito-Bold.ttf"),
    'NunitoSemiBold' : require("./assets/fonts/Nunito-SemiBold.ttf"),
    'NunitoExtraBold' : require("./assets/fonts/Nunito-ExtraBold.ttf"),
    'NunitoBlack' : require("./assets/fonts/Nunito-Black.ttf"),
    'VT323Regular' : require("./assets/fonts/VT323-Regular.ttf")
  })
  if (!fontsLoaded) {
    return <Spinner visible={!fontsLoaded} />;
  }
  return (
    <Provider store={store}>
      <AuthNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Button,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { addPredction } from "../redux/actions";

const metaData = {
  contentType: "image/jpeg",
};
const DetectCancer = () => {
  const { darkMode, user, predictions, Auth } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();
  const addPredcitionResult = async (
    uid,
    predictions,
    predictionResult,
    imageUrl
  ) => dispatch(addPredction(uid, predictions, predictionResult, imageUrl));
  const [image, setImage] = useState(null);
  const [styles, setStyles] = useState(getStyles(darkMode));
  const [uploading, setUpLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const bottomSheetModalRef = useRef();
  const [currenData, setCurrentData] = useState(null);
  useEffect(() => {
    setStyles(getStyles(darkMode));
  }, [darkMode, predictions]);
  const handlePressModal = () => {
    bottomSheetModalRef.current?.present();
  };
  const predictCancer = async (url) => {
    setProcessing(true);
    const data = {
      image_link: url,
    };
    await fetch("http://192.168.0.154:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data.predictions);
        setPredictionResult(data.predictions);
        await addPredcitionResult(
          Auth?.uid,
          predictions,
          data.predictions,
          url
        );
        setCurrentData({ ...data.predictions, imageUrl: url });
        handlePressModal();
      })
      .catch((err) => {
        console.log(err);
        setProcessing(false);
        return;
      });
    setProcessing(false);
  };
  const getBlobUri = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    return blob;
  };
  const uploadImage = async (imageBlob) => {
    setUpLoading(true);
    const storageRef = ref(storage, "images/" + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, imageBlob, metaData);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error.message);
        setUpLoading(false);
        setImage(null);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
          setImageUrl(downloadUrl);
          await predictCancer(downloadUrl);
        });
        setImage(null);
        setUpLoading(false);
      }
    );
  };
  const pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status != "granted") {
      const { newStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (newStatus != "granted") {
        Alert.alert(
          "Permission Denied",
          `Sorry, we need permission to upload images`
        );
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };
  const detectCancer = async () => {
    const imageBlob = await getBlobUri();
    await uploadImage(imageBlob);
  };
  return (
    <View style={styles.container}>
      <BottomSheetModalProvider>
        <TouchableOpacity
          style={styles.imageUploadContainer}
          onPress={() => {
            if (image === null) {
              pickImage();
            } else {
              detectCancer();
            }
          }}
        >
          <Text
            style={{
              fontFamily: "VT323Regular",
              fontSize: 60,
              color: "#1ABC9C",
              textAlign: "center",
            }}
          >
            {processing === true
              ? "PROCESSING"
              : uploading === true
              ? "UPLOADING"
              : image === null
              ? "UPLOAD"
              : "DETECT"}
          </Text>
        </TouchableOpacity>
        {image === null ? (
          <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={() => pickImage()}
          >
            <Text style={styles.imageUploadText}>Upload Image</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={() => detectCancer()}
          >
            <Text style={styles.imageUploadText}>Detect Cancer</Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            marginTop: 50,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "NunitoBold",
              fontSize: 20,
              color: darkMode ? "#fff" : "#000",
              marginRight: 10,
            }}
          >
            Prediction History
          </Text>
          <MaterialCommunityIcons
            name="history"
            color={darkMode ? "#fff" : "#000"}
            size={26}
          />
        </View>
        <ScrollView style={{ marginBottom: 40 }}>
          {predictions?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.predictionResultContainer}
                onPress={() => {
                  setCurrentData(item);
                  handlePressModal();
                }}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: 60, height: 60 }}
                />
                <View>
                  <Text style={styles.predictionTextStyle}>
                    Result : {item.label}
                  </Text>
                  <Text style={styles.predictionTextStyle}>
                    Accuracy : {Math.floor(item?.confidence * 100)}%
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={["70%"]}
          index={0}
          backgroundStyle={styles.bottomSheetStyle}
        >
          <View style={styles.bottomContainerStyle}>
            <Image
              source={{ uri: currenData?.imageUrl }}
              style={{ width: 250, height: 250, marginBottom: 40 }}
            />
            <Text style={styles.bottmContainerTextStyle}>
              Result : {currenData?.label}
            </Text>
            {currenData !== null && (
              <Text style={styles.bottmContainerTextStyle}>
                Accuracy : {Math.floor(currenData?.confidence * 100)}%
              </Text>
            )}
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};
const getStyles = (darkMode) => {
  return StyleSheet.create({
    container: {
      backgroundColor: darkMode ? "#000" : "#fff",
      height: "100%",
      padding: 20,
    },
    imageUploadContainer: {
      padding: 20,
      borderWidth: 3,
      borderColor: "#1ABC9C",
      marginTop: "20%",
      borderRadius: 150,
      width: Dimensions.get("screen").width / 1.6,
      height: Dimensions.get("screen").width / 1.6,
      alignSelf: "center",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
    imageUploadButton: {
      backgroundColor: "#1ABC9C",
      width: "40%",
      padding: 15,
      borderRadius: 25,
      marginTop: 30,
      alignSelf: "center",
    },
    imageUploadText: {
      color: "#fff",
      fontSize: 20,
      fontFamily: "NunitoExtraBold",
      textAlign: "center",
      verticalAlign: "middle",
    },
    bottomSheetStyle: {
      borderRadius: 20,
      backgroundColor: darkMode ? "#1a1a1a" : "#f4f4f4",
    },
    predictionTextStyle: {
      color: darkMode ? "#fff" : "#000",
      fontSize: 20,
      fontFamily: "NunitoExtraBold",
      marginLeft: 20,
    },
    predictionResultContainer: {
      display: "flex",
      flexDirection: "row",
      padding: 10,
      alignItems: "center",
    },
    bottomContainerStyle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: 30,
    },
    bottmContainerTextStyle: {
      color: darkMode ? "#fff" : "#000",
      fontSize: 24,
      fontFamily: "NunitoBold",
    },
  });
};
export default DetectCancer;

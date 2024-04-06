import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native";
import { firebase } from "./firebase";
import ProgressBar from "react-native-progress/Bar";
import * as FileSystem from "expo-file-system";
import { getDownloadURL } from "firebase/storage";
import axios from "axios";

const PredictionScreen = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [url, setURL] = useState(null);
  const uploadImg = async () => {
    setUploading(true);
    setTransferred(0);
    const { uri } = await FileSystem.getInfoAsync(image);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const filename = image.substring(image.lastIndexOf("/") + 1);
    const task = firebase.storage().ref().child(filename).put(blob);
    task.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setTransferred(progress);
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        getDownloadURL(task.snapshot.ref).then((downloadURL) =>
          setURL(downloadURL)
        );
      }
    );
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      "Photo uploaded!",
      "Your photo has been uploaded to Firebase Cloud Storage!"
    );
    setImage(null);
  };

  const PickImg = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status != "granted") {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera roll permission to upload images`
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        console.log(result.assets[0].uri);
        setImage(result.assets[0].uri);
        setError(null);
      }
    }
  };
  const predictClass = async () => {
    const result = await axios
      .post("http://192.168.0.158:5000/predict", {
        image: url,
      })
      .then((res) => console.log(res.data));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Image:</Text>
      <TouchableOpacity style={styles.button} onPress={PickImg}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      ) : null}
      {uploading ? (
        <View style={styles.progressBarContainer}>
          <ProgressBar progress={transferred} width={300} />
        </View>
      ) : (
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImg}>
          <Text style={styles.buttonText}>Upload image</Text>
        </TouchableOpacity>
      )}
      {url ? (
        <TouchableOpacity style={styles.button} onPress={predictClass}>
          <Text style={styles.buttonText}>detect cancer</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "#ffb6b9",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  progressBarContainer: {
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    marginTop: 16,
  },
});
export default PredictionScreen;

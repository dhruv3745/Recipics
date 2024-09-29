import { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

const CameraScreen = () => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      onDone(result);
    }
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      onDone(result);
    }
  };

  const onDone = (result: ImagePicker.ImagePickerSuccessResult) => {
    const uri = result.assets.map((asset) => asset.uri);

    router.push({
      pathname: "/(tabs)/(camera)/upload",
      params: { imageURI: uri },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={takePicture}
        style={styles.button}
      >
        <View style={styles.imageContainer}>
          <FontAwesome style={styles.icon} name="camera" color="black" />
          <Text style={styles.text}>Take a picture</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={pickImage}
        style={styles.button}
      >
        <View style={styles.imageContainer}>
          <Feather name="upload" style={styles.icon} color="black" />
          <Text style={styles.text}>Upload from library</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  camera: {
    // fontSize: 60,
  },
  icon: {
    fontSize: 100,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 30,
  },
  button: {
    width: "auto",
    height: "30%",
    aspectRatio: 1,
    backgroundColor: "#c8b8ac",
    borderRadius: 30,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
});

export default CameraScreen;

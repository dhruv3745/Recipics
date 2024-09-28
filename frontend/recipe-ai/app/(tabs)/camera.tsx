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

const CameraScreen = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!image ? (
        <>
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
        </>
      ) : (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <Button title="Again" onPress={() => setImage(null)} />
        </>
      )}
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

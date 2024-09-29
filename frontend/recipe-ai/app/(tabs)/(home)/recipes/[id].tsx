import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Pill from "@/components/Pill";
import { Button } from "react-native-ui-lib";

const RecipeScreen = () => {
  const { id } = useLocalSearchParams();
  const [recipeData, setRecipeData] = useState<any>(null);

  console.log(id);

  // fetch recipe data here from database
  useEffect(() => {
    fetch(`http://128.61.70.242:5001/get_recipe_by_id?recipe_id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error(response);
        }
        return response.json();
      })
      .then((data) => {
        setRecipeData(data);
      })
      .catch((error) => {
        console.error(error);
        setRecipeData(null);
      });
  }, [id]);

  if (!recipeData) {
    return null;
  }

  const {
    name,
    image,
    description,
    instructions,
    ingredients,
    cookedTime: time,
    difficulty,
    healthLabels: tags,
  } = recipeData;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {/* <Image style={styles.image} source={{ uri: image }} /> */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.text}>{name}</Text>
          <View style={styles.pillContainer}>
            {difficulty && <Pill>{difficulty}</Pill>}
            {time && <Pill>{time}</Pill>}
            {tags.map((tag: any) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </View>
          <Text style={[styles.text, styles.textDescription]}>
            {description}
          </Text>
          <View>
            <Text style={[styles.text, { marginTop: 15 }]}>Ingredients</Text>
            {ingredients.map((ingredient: any) => (
              <Text key={ingredient} style={styles.textDescription}>
                - {ingredient}
              </Text>
            ))}
          </View>
          <Button
            label="Instructions"
            style={{ backgroundColor: "#920003", marginTop: 20 }}
            onPress={() => {
              Linking.openURL(instructions);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure SafeAreaView takes up the full available height
    backgroundColor: "orange",
  },
  body: {
    width: "100%", // Ensure the ScrollView takes up full width
  },
  scrollContentContainer: {
    padding: 40, // Use smaller padding to ensure content remains on screen
    alignItems: "center",
    flexGrow: 1, // Ensure that ScrollView's content can grow to fill the available space
  },
  text: {
    color: "black",
    fontSize: 20,
    fontFamily: "Inter_500Medium",
  },
  image: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
    borderRadius: 15,
  },
  descriptionContainer: {
    flex: 1,
    width: "100%",
    marginTop: 10,
  },
  pillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 12,
    gap: 10,
  },
  textDescription: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
});

export default RecipeScreen;

import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Button, TextField } from "react-native-ui-lib";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IngredientsScreen = () => {
  const { ingredients } = useLocalSearchParams();
  const [parsedIngredients, setParsedIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [dietLabels, setDietLabels] = useState<string[]>([]);
  const [healthLabels, setHealthLabels] = useState<string[]>([]);
  const [cuisineType, setCuisineType] = useState<string[]>([]);

  const loadPreferences = async () => {
    try {
      const storedData = await AsyncStorage.getItem("userPreferences");
      if (storedData) {
        const { selectedIngredients, dietLabels, healthLabels, cuisineType } = JSON.parse(storedData);
        const ingredientList = [
          "Butter",
          "Salt",
          "Pepper",
          "Oil",
          "Flour",
          "Rice",
          "Milk (or substitute)",
          "Honey",
          "Garlic (or garlic powder)",
          "Vanilla Extract",
          "Baking Powder",
          "Baking Soda",
          "Cornstarch",
          "Onion Powder",
          "Cinnamon",
          "Cumin",
          "Paprika",
          "Turmeric",
          "Ginger",
          "Basil",
          "Oregano",
          "Thyme",
          "Rosemary",
          "Parsley",
        ];
        const ingredients = selectedIngredients.map(
          (index: number) => ingredientList[index]
        );
        setSelectedIngredients(ingredients);
        setDietLabels(dietLabels || []);
        setHealthLabels(healthLabels || []);
        setCuisineType(cuisineType || []);
      } else {
        if (ingredients) {
          setParsedIngredients(JSON.parse(String(ingredients)));
        }
      }
    } catch (error) {
      console.error("Failed to load preferences:", error);
    }
  };

  useEffect(() => {
    loadPreferences();
  }, [ingredients]);

  const onDelete = (index: number) => {
    const newIngredients = [...parsedIngredients];
    newIngredients.splice(index, 1);
    setParsedIngredients(newIngredients);
  };

  const fetchRecipes = () => {
    setLoading(true);
    const combinedIngredients = [...parsedIngredients, ...selectedIngredients];

    fetch(
      `http://128.61.70.242:5001/find_recipe?ingredients=${encodeURIComponent(
        combinedIngredients.join(",")
      )}&dietLabels=${encodeURIComponent(
        dietLabels.join(",")
      )}&healthLabels=${encodeURIComponent(
        healthLabels.join(",")
      )}&cuisineType=${encodeURIComponent(cuisineType.join(","))}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.error(response);
        }
        return response.json();
      })
      .then((data) => {
        router.navigate("/(camera)");
        router.replace({
          pathname: "/(tabs)/results",
          params: { data: JSON.stringify(data) },
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={[styles.text, { marginBottom: 10 }]}>
          Detected ingredients
        </Text>
        <FlatList
          data={parsedIngredients.concat(["add"])}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            if (item !== "add") {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    backgroundColor: "#f9f9f9",
                    borderRadius: 10,
                  }}
                >
                  <Text style={styles.ingredientText}>{item}</Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => onDelete(index)}
                  >
                    <AntDesign name="delete" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              );
            } else {
              return (
                <TextField
                  style={{
                    padding: 10,
                    backgroundColor: "lightgray",
                    height: 50,
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    borderRadius: 10,
                  }}
                  placeholder="Add ingredient"
                  onSubmitEditing={(e) => {
                    if (!e.nativeEvent.text) return;
                    setParsedIngredients([
                      ...parsedIngredients,
                      e.nativeEvent.text,
                    ]);
                  }}
                />
              );
            }
          }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
        <Button
          label="Find a Recipe"
          style={{ backgroundColor: "#920003" }}
          onPress={fetchRecipes}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontFamily: "Inter_600SemiBold",
  },
  ingredientText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
});

export default IngredientsScreen;

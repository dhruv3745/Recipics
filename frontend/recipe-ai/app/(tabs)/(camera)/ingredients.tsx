import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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
import {
  assumedIngredients,
  cuisineTypeList,
  dietaryPreferenceList,
  healthDataList,
} from "@/utils/constants";

const IngredientsScreen = () => {
  const { ingredients } = useLocalSearchParams();
  const [parsedIngredients, setParsedIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const [dietLabels, setDietLabels] = useState<string[]>([]);
  const [healthLabels, setHealthLabels] = useState<string[]>([]);
  const [cuisineType, setCuisineType] = useState<string[]>([]);

  const [error, setError] = useState<string | null>(null);

  const loadPreferences = async () => {
    try {
      const storedData = await AsyncStorage.getItem("userPreferences");

      if (storedData) {
        const {
          selectedIngredients,
          dietaryPreferences,
          healthData,
          cuisineType,
        } = JSON.parse(storedData);

        const ingredients = selectedIngredients.map(
          (index: number) => assumedIngredients[index]
        );
        const dietPreferences2 = dietaryPreferences.map(
          (index: number) => dietaryPreferenceList[index]
        );
        const healthData2 = healthData.map(
          (index: number) => healthDataList[index]
        );
        const cuisineType2 = cuisineType.map(
          (index: number) => cuisineTypeList[index]
        );

        setSelectedIngredients(ingredients);
        setHealthLabels(healthData2 || []);
        setDietLabels(dietPreferences2 || []);
        setCuisineType(cuisineType2 || []);
      } else {
      }
    } catch (error) {
      console.error("Failed to load preferences:", error);
    }
  };

  // This effect re-runs every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadPreferences();
    }, [])
  );

  useEffect(() => {
    loadPreferences();
    if (ingredients) {
      setParsedIngredients(JSON.parse(String(ingredients)));
      console.log(parsedIngredients);
    }
    console.log(dietLabels, healthLabels, cuisineType);
  }, [ingredients]);

  const onDelete = (index: number) => {
    const newIngredients = [...parsedIngredients];
    newIngredients.splice(index, 1);
    setParsedIngredients(newIngredients);
  };

  const fetchRecipes = () => {
    setError(null);
    setLoading(true);

    const combinedIngredients = [...parsedIngredients, ...selectedIngredients];

    let paramsArray = [];

    if (combinedIngredients.length > 0) {
      paramsArray.push(`ingredients=${combinedIngredients.join(",")}`);
    }

    if (dietLabels.length > 0) {
      paramsArray.push(`dietLabels=${dietLabels.join(",")}`);
    }

    if (healthLabels.length > 0) {
      paramsArray.push(`healthLabels=${healthLabels.join(",")}`);
    }

    if (cuisineType.length > 0) {
      paramsArray.push(`cuisineType=${cuisineType.join(",")}`);
    }

    const params = paramsArray.length > 0 ? `?${paramsArray.join("&")}` : "";

    console.log(params);

    fetch(`http://128.61.70.242:5001/find_recipe${params}`, {
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
        router.navigate("/(camera)");

        console.log(data);

        if (data.length === 0) {
          setError("No recipes found. Please try again.");
          return;
        }

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
        {error && (
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Inter_400Regular",
              marginBottom: 10,
              color: "red",
            }}
          >
            {error}
          </Text>
        )}
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

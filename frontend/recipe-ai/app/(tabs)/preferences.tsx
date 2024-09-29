import { SafeAreaView, StyleSheet, View } from "react-native";
import { Picker } from "react-native-ui-lib";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  cuisineTypeList,
  dietaryPreferenceList,
  healthDataList,
} from "@/utils/constants";

// Updated ingredients list
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

type IngredientOption = {
  label: string;
  value: number;
};

const PreferencesScreen = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<number[]>([]);
  const [healthData, setHealthData] = useState<number[]>([]);
  const [cuisineType, setCuisineType] = useState<number[]>([]); // Updated to cuisine type

  // State for options
  const [ingredientOptions, setIngredientOptions] = useState<
    IngredientOption[]
  >(
    ingredientList.map((ingredient, index) => ({
      label: ingredient,
      value: index,
    }))
  );

  const [dietaryOptions, setDietaryOptions] = useState<IngredientOption[]>(
    dietaryPreferenceList.map((preference, index) => ({
      label: preference,
      value: index,
    }))
  );

  const [healthDataOptions, setHealthDataOptions] = useState<
    IngredientOption[]
  >(
    healthDataList.map((healthDataOption, index) => ({
      label: healthDataOption,
      value: index,
    }))
  );

  const [cuisineTypeOptions, setCuisineTypeOptions] = useState<
    IngredientOption[]
  >( // Updated to use cuisine type
    cuisineTypeList.map((cuisineTypeOption, index) => ({
      label: cuisineTypeOption,
      value: index,
    }))
  );

  // Load preferences from AsyncStorage
  const loadPreferences = async () => {
    try {
      const storedData = await AsyncStorage.getItem("userPreferences");
      if (storedData) {
        const {
          selectedIngredients,
          dietaryPreferences,
          healthData,
          cuisineType, // Updated from mealTime to cuisineType
        } = JSON.parse(storedData);

        setSelectedIngredients(selectedIngredients || []);
        setDietaryPreferences(dietaryPreferences || []);
        setHealthData(healthData || []);
        setCuisineType(cuisineType || []); // Updated to set cuisineType
      } else {
        // Default: select all ingredients
        setSelectedIngredients(ingredientList.map((_, index) => index));
      }
    } catch (error) {
      console.error("Failed to load preferences:", error);
    }
  };

  // Save preferences to AsyncStorage
  const savePreferences = async () => {
    try {
      const preferences = {
        selectedIngredients,
        dietaryPreferences,
        healthData,
        cuisineType, // Updated from mealTime to cuisineType
      };

      await AsyncStorage.setItem(
        "userPreferences",
        JSON.stringify(preferences)
      );
    } catch (error) {
      console.error("Failed to save preferences:", error);
    }
  };

  useEffect(() => {
    loadPreferences(); // Load preferences when the component mounts
  }, []);

  useEffect(() => {
    savePreferences(); // Save preferences whenever they change
  }, [selectedIngredients, dietaryPreferences, healthData, cuisineType]); // Updated to include cuisineType

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Picker
          label={`Ingredients on Hand ${
            selectedIngredients.length ? `(${selectedIngredients.length})` : ""
          }`}
          placeholder={
            selectedIngredients.length === 0
              ? "Select ingredients"
              : `Selected ${selectedIngredients.length}`
          }
          labelStyle={styles.labelText}
          style={styles.picker}
          trailingAccessory={<Entypo name="chevron-small-down" size={24} />}
          mode={Picker.modes.MULTI}
          value={selectedIngredients} // Update selected ingredients
          onChange={(e) => {
            setSelectedIngredients(e as number[]);
          }} // Update selected ingredients
          items={ingredientOptions}
        />

        <Picker
          label={`Dietary Preferences ${
            dietaryPreferences.length ? `(${dietaryPreferences.length})` : ""
          }`}
          placeholder={
            dietaryPreferences.length === 0
              ? "Select preferences"
              : `Selected ${dietaryPreferences.length}`
          }
          labelStyle={styles.labelText}
          style={styles.picker}
          trailingAccessory={<Entypo name="chevron-small-down" size={24} />}
          mode={Picker.modes.MULTI}
          value={dietaryPreferences}
          onChange={(e) => setDietaryPreferences(e as number[])} // Update dietary preferences
          items={dietaryOptions}
        />

        <Picker
          label={`Health Options ${
            healthData.length ? `(${healthData.length})` : ""
          }`}
          placeholder={
            healthData.length === 0
              ? "Select diet"
              : `Selected ${healthData.length}`
          }
          labelStyle={styles.labelText}
          style={styles.picker}
          trailingAccessory={<Entypo name="chevron-small-down" size={24} />}
          mode={Picker.modes.MULTI}
          value={healthData}
          onChange={(e) => setHealthData(e as number[])} // Update diet selection
          items={healthDataOptions}
        />
        {/* Updated from Meal-time to Cuisine Type */}
        <Picker
          label={`Cuisine Type ${
            cuisineType.length ? `(${cuisineType.length})` : ""
          }`}
          placeholder={
            cuisineType.length === 0
              ? "Select cuisine type"
              : `Selected ${cuisineType.length}`
          }
          labelStyle={styles.labelText}
          style={styles.picker}
          trailingAccessory={<Entypo name="chevron-small-down" size={24} />}
          mode={Picker.modes.MULTI}
          value={cuisineType} // Updated to use cuisineType
          onChange={(e) => setCuisineType(e as number[])} // Updated to setCuisineType
          items={cuisineTypeOptions} // Updated to use cuisineTypeOptions
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
    padding: 20,
    gap: 20,
  },
  labelText: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 10,
  },
  picker: {
    padding: 5,
    borderColor: "black",
  },
});

export default PreferencesScreen;

import { SafeAreaView, StyleSheet, View } from "react-native";
import { Picker } from "react-native-ui-lib";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// Updated dietary preference list
const dietaryPreferenceList = [
  "Gluten-free",
  "Vegetarian",
  "Vegan",
  "Low-fat",
  "Low-sugar",
  "Dairy-free",
  "Egg-free",
  "Peanut-free",
  "Red-meat-free",
  "Fish-free",
  "Immuno-supportive",
  "Keto-friendly",
  "Kosher",
  "Soy-free",
];

// New diet options
const dietList = [
  "Balanced",
  "High-fiber",
  "High-protein",
  "Low-carb",
  "Low-fat",
  "Low-sodium",
];

// New meal-time options
const mealTimeList = [
  "Breakfast",
  "Dinner",
  "Lunch",
  "Snack",
  "Teatime",
];

type IngredientOption = {
  label: string;
  value: number;
};

const PreferencesScreen = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<number[]>([]);
  const [diet, setDiet] = useState<number[]>([]);
  const [mealTime, setMealTime] = useState<number[]>([]);

  // State for options
  const [ingredientOptions, setIngredientOptions] = useState<IngredientOption[]>(
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

  const [dietOptions, setDietOptions] = useState<IngredientOption[]>(
    dietList.map((dietOption, index) => ({
      label: dietOption,
      value: index,
    }))
  );

  const [mealTimeOptions, setMealTimeOptions] = useState<IngredientOption[]>(
    mealTimeList.map((mealTimeOption, index) => ({
      label: mealTimeOption,
      value: index,
    }))
  );

  // Load preferences from AsyncStorage
  const loadPreferences = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userPreferences');
      if (storedData) {
        const {
          selectedIngredients,
          dietaryPreferences,
          diet,
          mealTime,
        } = JSON.parse(storedData);
        setSelectedIngredients(selectedIngredients || []);
        setDietaryPreferences(dietaryPreferences || []);
        setDiet(diet || []);
        setMealTime(mealTime || []);
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
        diet,
        mealTime,
      };
      await AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
    } catch (error) {
      console.error("Failed to save preferences:", error);
    }
  };

  useEffect(() => {
    loadPreferences(); // Load preferences when the component mounts
  }, []);

  useEffect(() => {
    savePreferences(); // Save preferences whenever they change
  }, [selectedIngredients, dietaryPreferences, diet, mealTime]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        {/* Ingredients Picker */}
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
          value={selectedIngredients}
          onChange={setSelectedIngredients} // Update selected ingredients
          items={ingredientOptions}
        />

        {/* Dietary Preferences Picker */}
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
          onChange={setDietaryPreferences} // Update dietary preferences
          items={dietaryOptions}
        />

        {/* Diet Picker */}
        <Picker
          label={`Diet ${
            diet.length ? `(${diet.length})` : ""
          }`}
          placeholder={
            diet.length === 0
              ? "Select diet"
              : `Selected ${diet.length}`
          }
          labelStyle={styles.labelText}
          style={styles.picker}
          trailingAccessory={<Entypo name="chevron-small-down" size={24} />}
          mode={Picker.modes.MULTI}
          value={diet}
          onChange={setDiet} // Update diet selection
          items={dietOptions}
        />

        {/* Meal-time Picker */}
        <Picker
          label={`Meal-time ${
            mealTime.length ? `(${mealTime.length})` : ""
          }`}
          placeholder={
            mealTime.length === 0
              ? "Select meal-time"
              : `Selected ${mealTime.length}`
          }
          labelStyle={styles.labelText}
          style={styles.picker}
          trailingAccessory={<Entypo name="chevron-small-down" size={24} />}
          mode={Picker.modes.MULTI}
          value={mealTime}
          onChange={setMealTime} // Update meal-time selection
          items={mealTimeOptions}
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

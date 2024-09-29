import { SafeAreaView, StyleSheet, View } from "react-native";
import { Picker } from "react-native-ui-lib";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import { assumedIngredients } from "@/utils/constants";

const PreferencesScreen = () => {
  // TODO: add types
  const [selectedIngredients, setSelectedIngredients] = useState([3]);
  const [dietaryPreferences, setDietaryPreferences] = useState([1, 2, 3]);

  const [ingredientOptions, setIngredientOptions] = useState<
    {
      label: string;
      value: number;
    }[]
  >(
    assumedIngredients.map((ingredient, index) => ({
      label: ingredient,
      value: index,
    }))
  );

  // fetch user ingredients
  useEffect(() => {}, []);

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
          // topBarProps={{ doneButtonProps: { color: "#920003" } }}
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
          // topBarProps={{ doneButtonProps: { color: "#920003" } }}
          items={[
            { label: "Option 1", value: 0 },
            { label: "Option 2", value: 1 },
            { label: "Option 3", value: 2 },
            { label: "Option 4", value: 3, disabled: true },
            { label: "Option 5", value: 4 },
            { label: "Option 6", value: 5 },
            { label: "Option 7", value: 6 },
            { label: "Option 8", value: 6 },
          ]}
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
    // borderWidth: 1,
  },
});

export default PreferencesScreen;

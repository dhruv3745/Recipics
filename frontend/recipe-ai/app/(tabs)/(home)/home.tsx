import Card from "@/components/Card";
import { dummyRecipes } from "@/utils/dummy-data";
import { useState } from "react";
import { Image, View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Home = () => {
  const [recipes, setRecipes] = useState(dummyRecipes);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("@/assets/images/Recipics_logo.png")}
          />
        }
      </View>
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Home</Text>
        </View>
        <View style={styles.recipesContainer}>
          <Text style={styles.text}>Past recipes</Text>
          <View style={styles.cardContainer}>
            {recipes.map((recipe) => (
              <Card
                id={recipe.id}
                title={recipe.name}
                subtitle={`${recipe.calories} calories • ${recipe.time}`}
                image={recipe.image}
                key={recipe.id}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontFamily: "Inter_700Bold",
    fontSize: 40,
  },
  text: {
    color: "black",
    fontFamily: "Inter_600SemiBold",
    fontSize: 24,
    marginBottom: 20,
  },
  recipesContainer: {
    paddingHorizontal: 40,
    flex: 1,
  },
  titleContainer: {
    paddingBottom: 20,
    paddingHorizontal: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  cardContainer: {
    flexDirection: "column",
    flex: 1,
    gap: 20,
  },
  logo: {
    width: 150,
    height: "100%",
  },
});

export default Home;

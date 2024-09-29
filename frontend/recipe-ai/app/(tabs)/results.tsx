import { useLocalSearchParams } from "expo-router";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";

const ResultsScreen = () => {
  const { ingredients } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{ingredients}</Text>
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
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "Inter_600SemiBold",
  },
});

export default ResultsScreen;

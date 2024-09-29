import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";

const ResultsScreen = () => {
  const { data } = useLocalSearchParams();

  const parsedData: any[] = data ? JSON.parse(String(data)) : null;

  if (!parsedData) {
    return null;
  }

  console.log(parsedData);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        {parsedData.map((item: any, index: number) => (
          <Text key={index} style={styles.text}>
            {item.name}
          </Text>
        ))}
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
  link: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#920003",
    textDecorationLine: "underline",
  },
});

export default ResultsScreen;

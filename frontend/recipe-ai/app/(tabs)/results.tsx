import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";

const ResultsScreen = () => {
  const { data } = useLocalSearchParams();
  const [parsedData, setParsedData] = useState<any>();

  useEffect(() => {
    if (data && typeof data === "string") {
      setParsedData(JSON.parse(data));
    }
  }, [data]);

  if (!parsedData) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{parsedData.name}</Text>
        {/* <Link href={parsedData.instructions} style={styles.link}>
          {parsedData.instructions}
        </Link> */}
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

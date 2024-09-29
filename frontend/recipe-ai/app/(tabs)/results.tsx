import { Link, useLocalSearchParams } from "expo-router";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

const ResultsScreen = () => {
  const { data } = useLocalSearchParams();

  const parsedData: any[] = data ? JSON.parse(String(data)) : null;

  if (!parsedData) {
    return null;
  }

  console.log(parsedData[0]._id.$oid);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20, flex: 1 }}>
        <Text style={[styles.text, { marginBottom: 20 }]}>Found recipes</Text>
        <FlatList
          data={parsedData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <Link
              asChild
              href={{
                pathname: "/(home)/recipes/[id]",
                params: { id: item._id.$oid },
              }}
              style={[styles.text, styles.link]}
            >
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
              </TouchableOpacity>
            </Link>
          )}
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
    gap: 10,
  },
  text: {
    fontSize: 24,
    fontFamily: "Inter_600SemiBold",
  },
  link: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    borderRadius: 10,
    flex: 1,
  },
});

export default ResultsScreen;

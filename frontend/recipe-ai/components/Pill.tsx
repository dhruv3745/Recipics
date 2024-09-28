import { View, Text, StyleSheet } from "react-native";

interface PillProps {
  children: string;
}

const Pill = ({ children }: PillProps) => {
  return (
    <View style={styles.pill}>
      <Text style={styles.text}>{children.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  text: {
    color: "black",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1.0,
  },
});

export default Pill;

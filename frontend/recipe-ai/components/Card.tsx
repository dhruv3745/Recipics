import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

interface CardProps {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
}

const Card = ({ id, title, subtitle, image }: CardProps) => {
  return (
    <Link
      href={{ pathname: "/(tabs)/(home)/recipes/[id]", params: { id: id } }}
      asChild
    >
      <Pressable style={styles.container}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
          {subtitle && (
            <Text style={[styles.text, styles.subtitle]}>{subtitle}</Text>
          )}
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 15,
  },
  text: {
    color: "black",
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    marginTop: 5,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
  },
  textContainer: {
    marginTop: 3,
  },
});

export default Card;

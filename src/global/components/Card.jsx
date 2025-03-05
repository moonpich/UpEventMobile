import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";

export const Card = ({ nombre, disponibles, imagen }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.nameCard} numberOfLines={2} ellipsizeMode="tail">
        {nombre}
      </Text>
      <Text style={styles.disCard}>Disponibles: {disponibles}</Text>
      <View style={{ alignItems: "center", padding: 10 }}>
        <Image style={styles.imgCard} source={imagen} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgCard: {
    width: 122,
    height: 64,
    borderRadius: 20,
  },
  disCard: {
    color: "#999999",
  },
  nameCard: {
    color: "#FFFFFF",
  },
  card: {
    fontSize: 12,
    backgroundColor: "#0E0E0E",
    borderRadius: 12,
    width: 160,
    height: 163,
    margin: 9,
    padding: 8,
  },
});

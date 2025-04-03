import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { useTheme } from "../../global/context/ThemeContext";

export const Card = ({ nombre, startDate, imagen, endDate }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    imgCard: {
      width: 140,
      height: 75,
      borderRadius: 20,
      resizeMode: "cover",
    },
    disCard: {
      color: "#999999",
      fontFamily: "Century Gothic",
    },
    nameCard: {
      color: theme.textColor,
      fontFamily: "Century Gothic Bold",
    },
    card: {
      fontSize: 12,
      backgroundColor: theme.backgroundCard,
      borderRadius: 12,
      width: 160,
      height: 180,
      margin: 9,
      padding: 8,
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.nameCard} numberOfLines={2} ellipsizeMode="tail">
        {nombre}
      </Text>
      <Text style={styles.disCard}>
        Fecha Inicio: {startDate} a {endDate}
      </Text>
      <View style={{ alignItems: "center", padding: 10 }}>
        <Image style={styles.imgCard} source={{ uri: imagen }} />
      </View>
    </View>
  );
};

import React from "react";
import { View, Text, Image, StyleSheet} from "react-native";
import { useTheme } from "../../global/context/ThemeContext";

export function EventoCard({ name,startDate, endDate, frontPage }) {
  const { theme, toggleTheme } = useTheme();
  
const styles = StyleSheet.create({
  imgCard: {
    width: 140,
    height: 75,
    borderRadius: 20,
    resizeMode:'cover'
  },
  disCard: {
    color: "#999999",
    fontFamily: "Century Gothic"
  },
  nameCard: {
    color: theme.textColor,
    fontFamily: "Century Gothic Bold"
  },
  card: {
    fontSize: 12,
    backgroundColor: theme.tabBarStyle,
    borderRadius: 12,
    width: 160,
    height: 163,
    margin: 9,
    padding: 8,
    },
});


  return (
      <View style={styles.card}>
        <Text style={styles.nameCard} numberOfLines={2} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.disCard}>Del {startDate} al {endDate}</Text>
        <View style={{ alignItems: "center", padding: 10 }}>
          <Image style={styles.imgCard} source={{uri: frontPage}} />
        </View>
      </View>
  );
}

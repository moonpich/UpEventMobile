import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  FlatList,
} from "react-native";
import eventos from "../../global/data/data";
import { Card } from "../../global/components/Card";
import { Searchbar } from "react-native-paper";
import { useTheme } from "../../global/context/ThemeContext";

const logoUp = () => require("../../../assets/splash.png");

export const CheckerSearchEvents = () => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      padding: 25,
      backgroundColor: theme.background,
    },
    container: {
      alignItems: "center",
    },
    logo: {
      width: 145,
      height: 35,
      margin: 10,
    },
    text: {
      fontSize: 16,
      textAlign: "center",
      color: theme.textColor,
      fontFamily: "Century Gothic Bold",
    },
    searchBar: {
      color: theme.textColor,
      backgroundColor: theme.backgroundSearch,
      margin: 20,
    },
    card: {
      backgroundColor: theme.backgroundCard,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <Text style={styles.text}>Eventos</Text>

      <Searchbar
        style={styles.searchBar}
        placeholder="Buscar eventos"
        iconColor={theme.tabSearchColor}
      />

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              nombre={item.nombre}
              disponibles={item.disponibles}
              imagen={item.imagen}
              style={styles.card}
            />
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

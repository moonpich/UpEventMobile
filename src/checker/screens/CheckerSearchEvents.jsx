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
  const { theme } = useTheme(); // Accede al tema actual
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      padding: 25,
      backgroundColor: theme.background, // Aplica el color de fondo según el tema
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
      color: theme.textColor, // Aplica el color del texto según el tema
    },
    searchBar: {
      color: theme.textColor, // Aplica el color del texto en la barra de búsqueda
      backgroundColor: theme.backgroundSearch, // Color de fondo de la barra de búsqueda
      margin: 20,
    },
    card: {
      backgroundColor: theme.backgroundCard, // Aplica el color de fondo de las tarjetas
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
        iconColor={theme.tabSearchColor} // Color de los íconos en la barra de búsqueda
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
              style={styles.card} // Aplica el estilo de la card
            />
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

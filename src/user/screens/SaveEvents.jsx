import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  FlatList,
} from "react-native";
import { EventoCard } from "../components/Card";
const logoUp = () => {
  return require("../../../assets/splash.png");
};

const eventos = [
  {
    id: 1,
    nombre: "Expo. Globos Aerostáticos",
    disponibles: 200,
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPE7q_71BoPkj-DqJuiekoyns7n4cojgCmxg&s",
  },
  {
    id: 2,
    nombre: "Expo. Luces Nocturnas",
    disponibles: 2,
    imagen: "url_de_la_imagen_luces",
  },
];

export function SaveEvents() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <Text style={styles.text}>Mis Eventos</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventoCard
              nombre={item.nombre}
              disponibles={item.disponibles}
              imagen={item.imagen}
            />
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 25,
    backgroundColor: "#000000",
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
    color: "#B3B3B3",
  },
});

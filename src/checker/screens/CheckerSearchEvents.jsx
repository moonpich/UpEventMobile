import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  FlatList,
} from "react-native";
import { Card } from "../../global/components/Card";
import { Searchbar } from "react-native-paper";
import eventos from "../../global/data/data";

const logoUp = () => {
  return require("../../../assets/splash.png");
};


export const CheckerSearchEvents = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <Text style={styles.text}>Eventos</Text>

      <Searchbar
        style={styles.searchBar}
        placeholder="Buscar eventos"
        iconColor="#b3b3b3"
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
            />
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

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
  searchBar: {
    color: "#b3b3b3",
    backgroundColor: "#0e0e0e",
    margin: 20,
  },
});

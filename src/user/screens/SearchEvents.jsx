import React from "react";
import {StyleSheet, SafeAreaView, Image, View, FlatList,TouchableHighlight} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EventoCard } from "../components/Card";
import { Searchbar } from "react-native-paper";
import eventos from "../../global/data/data";

const logoUp = () => {
  return require("../../../assets/splash.png");
};


export function SearchEvents() {
  const navigation = useNavigation(); 

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
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
            <TouchableHighlight underlayColor="#333333" onPress={() => navigation.navigate("Event", { nombre: item.nombre, disponibles: item.disponibles, talleres: item.talleres, imagen:item.imagen })}>
              <EventoCard
                nombre={item.nombre}
                disponibles={item.disponibles}
                imagen={item.imagen}
              />
            </TouchableHighlight>
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
  searchBar: {
    color: "#b3b3b3",
    backgroundColor: "#0e0e0e",
    margin: 20,
  },
});

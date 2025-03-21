import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  FlatList,
  TouchableHighlight,
} from "react-native";
import eventos from "../../global/data/data";
import { Card } from "../../global/components/Card";
import { useNavigation } from "@react-navigation/native";

const logoUp = () => {
  return require("../../../assets/splash.png");
};

export const CheckerAvailableEvents = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <Text style={styles.text}>Eventos Disponibles</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight underlayColor="#333333" onPress={() => navigation.navigate("Scanner")}>
              <Card
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
});

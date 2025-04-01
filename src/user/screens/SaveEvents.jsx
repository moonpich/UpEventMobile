import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EventoCard } from "../components/Card";
import eventos from "../../global/data/data";
import { AuthContext } from "../../global/context/AuthContext";

const logoUp = () => {
  return require("../../../assets/splash.png");
};

export function SaveEvents() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const email = user.email;

  useEffect(() => {
    console.log("useEffect llamado");
    const fetchEvents = async () => {
      try {
        const data = await SaveEvents(email);
        setEvents(data);
      } catch (error) {
        console.log("Error obteniendo los eventos", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <Text style={styles.text}>Mis Eventos</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor="#333333"
              onPress={() =>
                navigation.navigate("SavedEvent", {
                  id: item.id,
                  nombre: item.nombre,
                  disponibles: item.disponibles,
                  talleres: item.talleres,
                  imagen: item.imagen,
                })
              }
            >
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
    fontSize: 22,
    textAlign: "center",
    color: "#B3B3B3",
  },
});

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
import { AuthContext } from "../../global/context/AuthContext";
import { getSaveEvents } from "../../global/data/apiUser";
import { useTheme } from "../../global/context/ThemeContext";

const logoUp = () => {
  return require("../../../assets/splash.png");
};

export function SaveEvents() {
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const email = user.email;

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
      fontSize: 22,
      textAlign: "center",
      color: theme.textColor,
    },
  });

  
  useEffect(() => {
    console.log("useEffect llamado");
    const fetchEvents = async () => {
      try {
        const data = await getSaveEvents(email);
        console.log(data);
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
          keyExtractor={(item) => item.event.id}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor="#333333"
              onPress={() =>
                navigation.navigate("SavedEvent", {
                  id: item.event.id,
                  name : item.event.name,
                  startDate: item.event.startDate,
                  endDate: item.event.endDate,
                  workshops: item.event.workshops,
                  frontPage: item.event. frontPage,
                })
              }
            >
              <EventoCard
                name={item.event.name}
                startDate={item.event.startDate}
                endDate={item.event.endDate}
                frontPage={item.event.frontPage}
              />
            </TouchableHighlight>
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}


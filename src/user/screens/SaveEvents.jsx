import React, { useContext, useState, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { EventoCard } from "../components/Card";
import { AuthContext } from "../../global/context/AuthContext";
import { getSaveEvents } from "../../global/data/apiUser";
import { useTheme } from "../../global/context/ThemeContext";

const logoUp = () => {
  return require("../../../assets/splash.png");
};

export function SaveEvents() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
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
      fontFamily:"Century Gothic Bold"
    },
  });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Actualizando eventos...");
      const data = await getSaveEvents(email);
      setEvents(data || []);
    } catch (error) {
      console.log("Error obteniendo los eventos", error);
      setEvents([])
    } finally {
      setLoading(false);
    }
  }, [email]);

  useFocusEffect(useCallback(() => { fetchEvents(); }, [fetchEvents]));




  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <Text style={styles.text}>Mis Eventos</Text>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.color} />
        ) : events.length === 0 ? (
          <Text style={{ color: theme.textColor, fontFamily: "Century Gothic Bold", fontSize: 22 }}>No te has registrado a ningun evento</Text>
        ) : (
          <FlatList
            data={events}
            keyExtractor={(item) => item.event.id}
            renderItem={({ item }) => (
              <TouchableHighlight
                underlayColor="#333333"
                onPress={() =>
                  navigation.navigate("SavedEvent", {
                    id: item.event.id,
                    name: item.event.name,
                    startDate: item.event.startDate,
                    endDate: item.event.endDate,
                    frontPage: item.event.frontPage,
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
        )}
      </View>
    </SafeAreaView>
  );
}


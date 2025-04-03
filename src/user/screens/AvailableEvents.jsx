import React, { useCallback, useEffect, useState } from "react";
import {
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { EventoCard } from "../components/Card";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../../global/context/ThemeContext";
import { getEvents } from "../../global/data/apiUser";
const logoUp = () => {
  return require("../../../assets/splash.png");
};

export const AvailableEvents = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    containerButton: {
      alignItems: "flex-end",
      marginTop: 20,
    },
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
      fontFamily: "Century Gothic Bold",
    },
  });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Actualizando eventos...");
      const data = await getEvents();
      setEvents(data || []);
    } catch (error) {
      console.log("Error obteniendo los eventos", error);
      setEvents([])
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { fetchEvents(); }, [fetchEvents]));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <Text style={styles.text}>Eventos Disponibles</Text>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.textColor} />
        ) : events.length === 0 ? (
          <Text style={{ color: theme.textColor, fontFamily: 'Century Gothic Bold' }}>
            No hay eventos disponibles
          </Text>
        ) : (
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableHighlight
                underlayColor="#333333"
                onPress={() =>
                  navigation.navigate("Event", {
                    id: item.id,
                    name: item.name,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    workshops: item.workshops,
                    frontPage: item.frontPage,
                  })
                }
              >
                <EventoCard
                  name={item.name}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  frontPage={item.frontPage}
                />
              </TouchableHighlight>
            )}
            numColumns={2} />
        )}
      </View>
    </SafeAreaView>
  );
};

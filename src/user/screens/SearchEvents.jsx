import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, SafeAreaView, Image, View, FlatList, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EventoCard } from "../components/Card";
import { Search } from 'lucide-react-native';
import { getEvents } from "../../global/data/apiUser";
const logoUp = () => {
  return require("../../../assets/splash.png");
};


export function SearchEvents() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("useEffect llamado");
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.log("Error obteniendo los eventos", error);
      }
    };

    fetchEvents();
  }, []);


  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <View style={styles.containerSearch}>
        <Search size={20} color="#b3b3b3" style={styles.icon} />
        <TextInput
          style={styles.inputSearch}
          placeholder="Buscar eventos"
          placeholderTextColor="#b3b3b3"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight underlayColor="#333333" onPress={() => navigation.navigate("Event", { id: item.id, name: item.name, startDate: item.startDate, endDate: item.endDate, workshops: item.workshops, frontPage: item.frontPage })}>
              <EventoCard
                name={item.name}
                startDate={item.startDate}
                endDate={item.endDate}
                frontPage={item.frontPage}
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
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    height: 40,
    margin: 12
  },
  icon: {
    marginRight: 5,
    marginLeft: 10
  },
  inputSearch: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: "Century Gothic"
  },
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
    backgroundColor: "#0e0e0e",
    margin: 20,
  },
});
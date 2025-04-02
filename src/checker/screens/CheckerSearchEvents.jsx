import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  FlatList,
  TextInput
} from "react-native";
import { Search } from 'lucide-react-native';
import eventos from "../../global/data/data";
import { Card } from "../../global/components/Card";
import { useTheme } from "../../global/context/ThemeContext";

const logoUp = () => require("../../../assets/splash.png");

export const CheckerSearchEvents = () => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    containerSearch: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 20,
      height: 40,
      margin: 12
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
    searchBar: {
      color: theme.textColor,
      backgroundColor: theme.backgroundSearch,
      margin: 20,
    },
    card: {
      backgroundColor: theme.backgroundCard,
    },
  });

  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = eventos.filter(event =>
    event.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <Text style={styles.text}>Eventos</Text>

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
            <Card
              nombre={item.nombre}
              disponibles={item.disponibles}
              imagen={item.imagen}
              style={styles.card}
            />
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

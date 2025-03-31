import React, { useEffect, useState } from "react";
import { TouchableHighlight, StyleSheet, SafeAreaView, Image, View, Text, FlatList, TouchableOpacity } from "react-native";
import { EventoCard } from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../global/context/ThemeContext";
import Icon from 'react-native-vector-icons/Ionicons';
import { getEvents } from "../../global/data/apiUser";
const logoUp = () => {
  return require("../../../assets/splash.png");
};

export const AvailableEvents = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    containerButton: {
      alignItems: 'flex-end',
      marginTop: 20
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
      color: "#B3B3B3",
      fontFamily: "Century Gothic Bold"
    },
  });


  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("useEffect llamado");
    const fetchEvents = async ()=>{
      try{
        const data = await getEvents();
        setEvents(data);
      }catch(error){
        console.log("Error obteniendo los eventos", error);
      }
    };

    fetchEvents();
  },[]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.containerButton}>
        <TouchableOpacity onPress={toggleTheme}>
          <Icon name={theme.background === "#000000" ? "sunny" : "moon"} size={30} color={theme.textColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <Text style={styles.text}>Eventos Disponibles</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight underlayColor="#333333" onPress={() => navigation.navigate("Event", { id:item.id, name: item.name, startDate: item.startDate, endDate: item.endDate,  workshops: item.workshops, frontPage: item.frontPage })}>
              <EventoCard
                name={item.name}
                startDate ={item.startDate}
                endDate ={item.endDate}
                frontPage={item.frontPage}
              />
            </TouchableHighlight>
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};
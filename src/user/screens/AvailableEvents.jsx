import React from "react";
import { TouchableHighlight, StyleSheet, SafeAreaView, Image, View, Text, FlatList, TouchableOpacity } from "react-native";
import { Card } from "../../global/components/Card";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../global/context/ThemeContext";
import Icon from 'react-native-vector-icons/Ionicons';
import eventos from "../../global/data/data";


const logoUp = () => {
  return require("../../../assets/splash.png");
};

export const AvailableEvents = () => {
  const navigation = useNavigation(); 
  const { theme, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    containerButton: {
      alignItems:'flex-end',
      marginTop:20
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
    },
  });
  

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
          data={eventos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight underlayColor="#333333" onPress={() => navigation.navigate("Event", { nombre: item.nombre, disponibles: item.disponibles, talleres: item.talleres, imagen:item.imagen })}>
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


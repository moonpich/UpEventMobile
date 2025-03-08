import React from "react";
import { StyleSheet, SafeAreaView, Image, View, Text, FlatList, TouchableHighlight} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EventoCard } from "../components/Card";
const logoUp = () => {
  return require("../../../assets/splash.png");
};

const eventos = [
  {
    id: 1,
    nombre: "Expo. Globos Aerostáticos ppppppppppppppppppppppppp",
    disponibles: 200,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPE7q_71BoPkj-DqJuiekoyns7n4cojgCmxg&s",
    talleres: [
      {id:1, nombre: "Fotografía aérea", cupo: 20 },
      {id:2, nombre: "Historia de los globos aerostáticos", cupo: 15 }
    ]
  },
  {
    id: 2,
    nombre: "Expo. Luces Nocturnas",
    disponibles: 2,
    imagen: "url_de_la_imagen_luces",
    talleres: [
      { id:1, nombre: "Iluminación artística", cupo: 10 },
      { id:2, nombre: "Técnicas de fotografía nocturna", cupo: 12 }
    ]
  },
];

export function SaveEvents() {
  const navigation = useNavigation(); 

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <Text style={styles.text}>Mis Eventos</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight underlayColor="#333333" onPress={() => navigation.navigate("SavedEvent", { nombre: item.nombre, disponibles: item.disponibles, talleres: item.talleres, imagen:item.imagen })}>
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

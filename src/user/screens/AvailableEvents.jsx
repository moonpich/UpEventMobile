import React from "react";
import { TouchableHighlight, StyleSheet, SafeAreaView, Image, View, Text, FlatList } from "react-native";
import { Card } from "../../global/components/Card";
import { useNavigation } from "@react-navigation/native";

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
  {
    id: 3,
    nombre: "Feria Gastronómica",
    disponibles: 37,
    imagen: "url_de_la_imagen_gastronomica",
    talleres: [
      { id:1, nombre: "Cocina internacional", cupo: 25 },
      { id:2, nombre: "Maridaje de vinos", cupo: 18 }
    ]
  },
  {
    id: 4,
    nombre: "Expo. Artesanal",
    disponibles: 23,
    imagen: "url_de_la_imagen_artesanal",
    talleres: [
      { id:1, nombre: "Técnicas de cerámica", cupo: 30 },
      { id:2, nombre: "Pintura sobre tela", cupo: 20 }
    ]
  },
  {
    id: 5,
    nombre: "Festival Ecológico",
    disponibles: 80,
    imagen: "url_de_la_imagen_ecologico",
    talleres: [
      { id:1, nombre: "Huertos urbanos", cupo: 40 },
      { id:2, nombre: "Reciclaje creativo", cupo: 22 }
    ]
  }
];

export const AvailableEvents = () => {
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

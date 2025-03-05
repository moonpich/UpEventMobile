import React from "react";
import { StyleSheet, Image, View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarPlus } from "lucide-react-native";

const logoUp = () => {
  return require("../../../assets/splash.png");
};

export function Event({ route }) {
  const { nombre, disponibles, talleres, imagen } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>

      <View style={styles.card}>
        <Text style={styles.nameCard}>{nombre}</Text>
        <Text style={styles.disCard}>Cupos disponibles: {disponibles}</Text>

        <View style={styles.imageContainer}>
          <Image style={styles.imgCard} source={imagen} />
        </View>

        <Text style={styles.talleresTitle}>Talleres:</Text>

        <FlatList
          data={talleres}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.talleres}>
              <View>
                <Text style={styles.tallerText}>{item.nombre}</Text>
                <Text style={styles.tallerCupo}>
                  Disponibilidad: {item.cupo}
                </Text>
              </View>
              <CalendarPlus color={"#F7EBF9"} size={32} style={styles.icon} />
            </View>
          )}
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
    alignItems: "center",
  },
  container: {
    alignItems: "center",
  },
  logo: {
    width: 145,
    height: 35,
    margin: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "#0e0e0e",
    borderRadius: 12,
    padding: 15,
    overflow: "hidden",
  },
  nameCard: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  disCard: {
    color: "#999999",
    fontSize: 14,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    padding: 10,
  },
  imgCard: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  talleresTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginTop: 10,
  },
  talleres: {
    backgroundColor: "#330033",
    height: 67,
    width: "95%",
    marginVertical: 5,
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tallerText: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  tallerCupo: {
    fontSize: 13,
    color: "#CCCCCC",
  },
  icon: {
    alignSelf: "center",
  },
});

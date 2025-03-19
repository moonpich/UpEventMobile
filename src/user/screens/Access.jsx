import React from "react";
import { StyleSheet, Image, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";

const logoUp = () => {
  return require("../../../assets/splash.png");
};

export default function Access({ route }) {
  const { nombre, disponibles, talleres, imagen } = route.params;
  const qrData = `Evento: ${nombre}, Rol:usuario`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <Text style={{ fontSize: 16, color: "#b3b3b3" }}>Codigo Acceso</Text>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.nameCard}>{nombre}</Text>
          <Text style={styles.disCard}>Cupos disponibles: {disponibles}</Text>

          <View style={styles.imageContainer}>
            <Image style={styles.imgCard} source={imagen} />
          </View>

          <View style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#333333",
                borderRadius: 12
              }}
            >
              <QRCode value={qrData} size={200} />
            </View>
          </View>
        </View>
      </ScrollView>
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

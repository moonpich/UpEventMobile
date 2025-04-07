import React from "react";
import { StyleSheet, Image, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
import { useTheme } from "../../global/context/ThemeContext";

const logoUp = () => {
  return require("../../../assets/splash.png");
};

export default function Access({ route }) {
    const { theme } = useTheme();

    
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 25,
    backgroundColor: theme.background,
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
    backgroundColor: theme.backgroundCard,
    borderRadius: 12,
    padding: 15,
    overflow: "hidden",
  },
  nameCard: {
    color: theme.textColor,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  disCard: {
    color: theme.textColor,
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
    color: theme.textColor,
    fontWeight: "bold",
    marginTop: 10,
  },
  talleres: {
    backgroundColor:  "#6B2376",
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
    color: theme.textColor,
    fontWeight: "bold",
  },
  tallerCupo: {
    fontSize: 13,
    color: theme.textColor,
  },
  icon: {
    alignSelf: "center",
  },
});

  const { email, idEvent, event, idWorkshop, workshop} = route.params;
  console.log(email);
  console.log(idEvent);
  console.log(event);
  console.log(idWorkshop);
  console.log(workshop);

  const qrData = {
    email: email, 
    idEvent: idEvent,
    event: event,
    idWorkshop: idWorkshop,
    workshop: workshop
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <Text style={{ fontSize: 16, color: "#b3b3b3" }}>Codigo Acceso</Text>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.nameCard}>{workshop}</Text>
          <View style={styles.imageContainer}>
            {/*<Image style={styles.imgCard} source={imagen} />*/}
          </View>

          <View style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#333333",
                borderRadius: 12
              }}
            >
              <QRCode value={JSON.stringify(qrData)} size={200} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

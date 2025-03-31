import React, { useState, useRef } from 'react';
import { StyleSheet, Image, View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarPlus } from "lucide-react-native";
import { generarYEnviarQR } from "../../global/data/apiUser";
const logoUp = () => {
  return require("../../../assets/splash.png");
};

export function Event({ route }) {
  const { id, name, startDate, endDate, workshops, frontPage } = route.params;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <View style={styles.card}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.nameCard} ellipsizeMode="tail">{name}</Text>
            <Text style={styles.disCard}>Del {startDate} al {endDate}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <CalendarPlus color={"#F7EBF9"} size={48} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.imgCard} source={{ uri: frontPage }} />
        </View>
        <Text style={styles.talleresTitle}>Talleres:</Text>
        <FlatList
          data={workshops}
          keyExtractor={(item) => String(item.id)}
          style={{ width: "100%" }}
          renderItem={({ item }) => (
            <View style={styles.talleres}>
              <View style={{ flex: 1 }}>
                <Text style={styles.tallerText}>{item.name}</Text>
                <Text style={styles.tallerCupo}>
                  Disponibilidad: {item.capacity}
                </Text>
              </View>
              <TouchableOpacity onPress={() => generarYEnviarQR(id, item.id, item.name)}>
                <CalendarPlus color={"#F7EBF9"} size={32} style={styles.icon} />
              </TouchableOpacity>
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
    fontSize: 19,
    marginBottom: 5,
    fontFamily: "Century Gothic Bold"
  },
  disCard: {
    color: "#999999",
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Century Gothic"
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
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: "Century Gothic Bold",
    marginTop: 10,
  },
  talleres: {
    backgroundColor: "#330033",
    height: 67,
    width: "100%",
    marginVertical: 5,
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tallerText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Century Gothic Bold"
  },
  tallerCupo: {
    fontSize: 14,
    color: "#CCCCCC",
    fontFamily: "Century Gothic"
  },
  icon: {
    alignSelf: "center",
  },
});

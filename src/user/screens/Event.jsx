import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Image, View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarPlus, CalendarHeart } from "lucide-react-native";
import { registerWorkshop } from '../../global/data/apiUser';
import { registerEvent, getSaveEvents, savedWorkhops } from '../../global/data/apiUser';
import { AuthContext } from '../../global/context/AuthContext';
import { useTheme } from '../../global/context/ThemeContext';
const logoUp = () => {
  return require("../../../assets/splash.png");
};

export function Event({ route }) {
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
  const { id, name, startDate, endDate, workshops, frontPage } = route.params;
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredWorkshops, setRegisteredWorkshops] = useState([]);


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
      flex: 1,
      width: "100%",
      backgroundColor: theme.backgroundCard,
      borderRadius: 12,
      padding: 15,
      overflow: "hidden",
    },
    nameCard: {
      color: theme.textColor,
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
      color: theme.textColor,
      fontFamily: "Century Gothic Bold",
      marginTop: 10,
    },
    talleres: {
      backgroundColor: "#6B2376",
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
      color: theme.textColor,
      fontFamily: "Century Gothic Bold"
    },
    tallerCupo: {
      fontSize: 14,
      color: theme.textColor,
      fontFamily: "Century Gothic"
    },
    icon: {
      alignSelf: "center",
    },
  });

  const validarRegistro = async () => {
    try {
      const savedEvents = await getSaveEvents(user.email);
      const exists = savedEvents.some(item => item.event.id === id);
      setIsRegistered(exists);
    } catch (error) {
      console.log("Error verificando registro", error);
    }
  };
  const validarWorkshops = async () => {
    try {
      const saved = await savedWorkhops(user.email, id);
      const inscritos = saved.map(item => item.id);
      setRegisteredWorkshops(inscritos);
    } catch (error) {
      console.log("Error verificando talleres", error);
    }
  };

  useEffect(() => {
    validarRegistro();
    validarWorkshops();
  }, []);

  const registrar = async () => {
    try {
      await registerEvent(id, user.email);
      setIsRegistered(true);
    } catch (error) {
      console.log("Error registrando al evento", error);
    }
  };

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
            <TouchableOpacity onPress={registrar} disabled={isRegistered}>
              {isRegistered ? (
                <CalendarHeart color={theme.textColor} size={48} style={styles.icon} />
              ) : (
                <CalendarPlus color={theme.textColor} size={48} style={styles.icon} />
              )}
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
          renderItem={({ item }) => {
            const yaInscrito = registeredWorkshops.includes(item.id);
            return (
              <View style={styles.talleres}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.tallerText}>{item.name}</Text>
                  <Text style={styles.tallerCupo}>
                    Disponibilidad: {item.capacity}
                  </Text>
                </View>
                <TouchableOpacity onPress={ async () => {
                  if (!yaInscrito) {
                    try{
                      await registerWorkshop(user.email, id, name, item.id, item.name);
                      setRegisteredWorkshops(prev => [...prev, item.id]);
                    }catch(error){
                      console.log("No se registro al taller");
                    }}
                }} disabled={yaInscrito}>
                  {yaInscrito ? (
                    <CalendarHeart color={theme.textColor} size={32} style={styles.icon} />

                  ) : (
                    <CalendarPlus color={theme.textColor} size={32} style={styles.icon} />

                  )}
                </TouchableOpacity>
              </View>
            )
          }}
        />
      </View>
    </SafeAreaView >
  );
}

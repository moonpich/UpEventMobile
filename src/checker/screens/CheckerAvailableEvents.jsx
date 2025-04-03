import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  FlatList,
  TouchableHighlight,
} from "react-native";
import eventos from "../../global/data/data";
import { Card } from "../../global/components/Card";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../global/context/ThemeContext";
import { AuthContext } from "../../global/context/AuthContext";
import { partialUser } from "../../global/schemas/schemas";
import { AssignedEvents } from "../../global/data/apiChecker";
const logoUp = () => {
  return require("../../../assets/splash.png");
};
export const CheckerAvailableEvents = () => {
  const [assignedEvents, setAssignedEvents] = useState([]);
  const navigation = useNavigation();
  const {
    user: { email },
  } = useContext(AuthContext);
  const { theme } = useTheme();
  const styles = StyleSheet.create({
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
  });

  useEffect(() => {
    const validUser = partialUser({ user: email });
    if (!validUser.success) {
      setAssignedEvents([]);
    }
    const request = async () => {
      const assignedEventRequest = await AssignedEvents({ email: email });
      if (assignedEventRequest.length === 0) {
        setAssignedEvents([]);
      }
      setAssignedEvents(assignedEventRequest);
    };
    request();
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <Text style={styles.text}>Eventos Asignados</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {assignedEvents.length === 0 ? (
          <TouchableHighlight
            underlayColor="#333333"
            onPress={() => navigation.navigate("Scanner")}
          >
            <Card
              nombre={"No tienes eventos"}
              disponibles={0}
              styles={styles.card}
            />
          </TouchableHighlight>
        ) : (
          <FlatList
            data={assignedEvents}
            keyExtractor={(item) => item.event.id}
            renderItem={({ item }) => (
              <TouchableHighlight
                underlayColor="#333333"
                onPress={() => navigation.navigate("Scanner")}
              >
                <Card
                  nombre={item.event.name}
                  startDate={item.event.startDate}
                  endDate={item.event.endDate}
                  imagen={item.event.frontPage}
                  styles={styles.card}
                />
              </TouchableHighlight>
            )}
            numColumns={2}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

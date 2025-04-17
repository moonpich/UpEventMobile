import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableHighlight
} from "react-native";
import { Search } from "lucide-react-native";
import { Card } from "../../global/components/Card";
import { useTheme } from "../../global/context/ThemeContext";
import { AuthContext } from "../../global/context/AuthContext";
import { partialUser } from "../../global/schemas/schemas";
import { AssignedEvents } from "../../global/data/apiChecker";
const logoUp = () => require("../../../assets/splash.png");

export const CheckerSearchEvents = () => {
  const { theme } = useTheme();
  const {
    user: { email },
  } = useContext(AuthContext);
  const [assigndEvents, setAssignedEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = assigndEvents.filter(
    (item) =>
      item?.event?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const styles = StyleSheet.create({
    containerSearch: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.tabBarStyle,
      borderRadius: 20,
      height: 40,
      margin: 12,
      padding: 1,
    },
    inputSearch: {
      flex: 1,
      fontSize: 16,
      color: theme.textColor,
      fontFamily: "Century Gothic",
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
      color: theme.textColor,
      fontFamily: "Century Gothic Bold",
    },
    searchBar: {
      color: theme.textColor,
      backgroundColor: theme.backgroundSearch,
      margin: 20,
    },
    icon: {
      marginHorizontal: 10,
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
      <Text style={styles.text}>Eventos</Text>

      <View style={styles.containerSearch}>
        <Search size={20} color="#b3b3b3" style={styles.icon} />
        <TextInput
          style={styles.inputSearch}
          placeholder="Buscar eventos"
          placeholderTextColor="#b3b3b3"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {assigndEvents.length === 0 ? (
          <View>
            <Text style={{ color: theme.textColor, fontFamily: 'Century Gothic Bold', fontSize: 22 }}>
              No tienes eventos asignados
            </Text>
            <TouchableHighlight
              underlayColor="#333333"
              onPress={() => navigation.navigate("ViewDetails")}>
              <Text>Abrir scanner</Text>
            </TouchableHighlight>
          </View>
        ) : (
          <FlatList
            data={filteredEvents}
            keyExtractor={(item) => item.event.id}
            renderItem={({ item }) => (
              <TouchableHighlight
                underlayColor="#333333"
                onPress={() =>
                  navigation.navigate("ViewDetails", {
                    id: item.event.id,
                    name: item.event.name,
                    startDate: item.event.startDate,
                    endDate: item.event.endDate,
                    workshops: item.event.workshops,
                    frontPage: item.event.frontPage,
                  })
                }
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

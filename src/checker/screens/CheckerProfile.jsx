import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { CircleUserRound, LogOut } from "lucide-react-native";
import { useTheme } from "../../global/context/ThemeContext";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-paper";
import { AuthContext } from "../../global/context/AuthContext";
import { useContext } from "react";
const logoUp = () => {
  return require("../../../assets/splash.png");
};

export const CheckerProfile = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useContext(AuthContext);

  const styles = StyleSheet.create({
    containerButton: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: 20,
      gap: 20,
      padding: 3,
    },
    input: {
      margin: 10,
      borderColor: theme.textColor,
      borderBottomWidth: 1,
      padding: 5,
      fontSize: 16,
      color: theme.textColor,
      fontFamily: "Century Gothic",
    },
    containerProfile: {
      flex: 1,
      backgroundColor: theme.tabBarStyle,
      borderRadius: 20,
      margin: 20,
      height: 800,
    },
    safeArea: {
      flex: 1,
      padding: 25,
      backgroundColor: theme.background,
    },
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 145,
      height: 35,
      margin: 10,
    },
    text: {
      fontSize: 16,
      color: theme.textColor,
      margin: 10,
      fontFamily: "Century Gothic",
    },
    textButton: {
      fontSize: 20,
      color: "#F1F1F1",
      margin: 10,
      fontFamily: "Century Gothic Bold",
    },
    title: {
      fontSize: 22,
      color: theme.textColor,
      textAlign: "center",
      margin: 10,
      fontFamily: "Century Gothic Bold",
    },
    button: {
      backgroundColor: "#6B2376",
      borderRadius: 12,
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      textColor: "#F1F1F1",
      margin: 20,
      fontFamily: "Century Gothic",
    },
    card: {
      backgroundColor: theme.tabBarStyle,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.containerButton}>
        <TouchableOpacity onPress={toggleTheme}>
          <Icon
            name={theme.background === "#000000" ? "sunny" : "moon"}
            size={30}
            color={theme.textColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()}>
          <LogOut size={30} color={theme.textColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <View style={styles.containerProfile}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 195,
          }}
        >
          <CircleUserRound
            size={195}
            color={theme.iconProfile}
            strokeWidth={0.5}
          />
        </View>
        <Text style={styles.title}>Mi perfil</Text>
        <Text style={styles.text}>Contraseña actual</Text>
        <TextInput style={styles.input} />
        <Text style={styles.text}>Nueva contraseña</Text>
        <TextInput style={styles.input} secureTextEntry />
        <Text style={styles.text}>Numero telefónico</Text>
        <TextInput style={styles.input} secureTextEntry />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

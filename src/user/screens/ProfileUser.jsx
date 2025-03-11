import React from "react";
import { StyleSheet, SafeAreaView, Image, View, Text, TextInput, TouchableOpacity } from "react-native";
import { CircleUserRound } from "lucide-react-native";
import { useTheme } from "../../global/context/ThemeContext";
import Icon from 'react-native-vector-icons/Ionicons';


const logoUp = () => {
  return require("../../../assets/splash.png");
};

export const Profile = () => {
  const { theme, toggleTheme } = useTheme();


  const styles = StyleSheet.create({
    containerButton: {
      alignItems:'flex-end',
      marginTop:20
    },
    input: {
      margin: 10,
      borderColor: theme.textColor,
      borderBottomWidth: 1,
      padding: 5,
      fontSize: 16,
      color: theme.textColor
    },
    containerProfile: {
      flex: 1,
      backgroundColor: theme.tabBarStyle,
      borderRadius: 20,
      margin: 20,
      height: 800
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
      margin: 10
    },
    title: {
      fontSize: 22,
      color: theme.textColor,
      textAlign: 'center',
      margin: 10
    }
  });


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.containerButton}>
        <TouchableOpacity onPress={toggleTheme}>
          <Icon name={theme.background === "#000000" ? "sunny" : "moon"} size={30} color={theme.textColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <View style={styles.containerProfile} >
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 195 }}>
          <CircleUserRound size={195} color={theme.textColor} strokeWidth={0.5} />
        </View>
        <Text style={styles.title}>Mi perfil</Text>
        <Text style={styles.text}>Correo</Text>
        <TextInput style={styles.input}
          value="melissapineda@gmail.com"
        />
        <Text style={styles.text}>Contraseña</Text>
        <TextInput style={styles.input}
          value="********"
          secureTextEntry />
      </View>
    </SafeAreaView>
  );
};

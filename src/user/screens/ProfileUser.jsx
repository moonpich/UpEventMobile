import React from "react";
import { StyleSheet, SafeAreaView, Image, View, Text, TextInput } from "react-native";
import {CircleUserRound} from "lucide-react-native";

const logoUp = () => {
  return require("../../../assets/splash.png");
};

export const Profile = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>
      <View style={styles.containerProfile} >
        <View style={{justifyContent:'center', alignItems:'center', height:195}}>
          <CircleUserRound size={195} color={"#B3B3B3"} strokeWidth={0.5}/>
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

const styles = StyleSheet.create({
  input:{
    margin:10,
    borderColor:"#B3B3B3",
    borderBottomWidth: 1,
    padding:5, 
    fontSize:16,
    color:"#b3b3b3"
    },
  containerProfile: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    borderRadius: 20,
    margin: 20,
    height: 800
  },
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
    fontSize: 16,
    color: "#735973",
    margin:10
  },
  title: {
    fontSize: 22,
    color: "#B3B3B3",
    textAlign:'center',
    margin:10
  }
});

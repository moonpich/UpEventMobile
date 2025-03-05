import React from "react";

import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  TextInput,
} from "react-native";

const logoUp = () => {
  return require("../../../assets/splash.png");
};

export const Profile = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logoUp()} />
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileImage} />

        <Text style={styles.title}>Mi perfil</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo</Text>

          <TextInput
            style={styles.input}
            value="melissapineda@gmail.com"
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>

          <TextInput
            style={styles.input}
            value="********"
            secureTextEntry
            editable={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

  profileContainer: {
    alignItems: "center",

    marginTop: 20,
  },

  profileImage: {
    width: 100,

    height: 100,

    borderRadius: 50,

    borderWidth: 2,

    borderColor: "#00FFFF",

    marginBottom: 10,
  },

  title: {
    fontSize: 22,

    color: "#FFFFFF",

    marginBottom: 20,
  },

  inputContainer: {
    width: "100%",

    marginBottom: 15,
  },

  label: {
    fontSize: 14,

    color: "#B3B3B3",

    marginBottom: 5,
  },

  input: {
    backgroundColor: "#0e0e0e",

    color: "#FFFFFF",

    padding: 10,

    borderRadius: 8,
  },
});

import { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { AuthContext } from "../context/AuthContext";


const logoUp = () => {
  return require("../../../assets/splash.png");
};
const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={logoUp()} />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <View>
          <Text style={styles.label}>
            Correo <Text style={styles.labelImportant}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su correo"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={"rgba(242, 242, 242, .2)"}
            onChangeText={(text) => setUsername(text.trim().toLowerCase())}
          />
          <Text style={styles.line}>
            ___________________________________________
          </Text>
        </View>

        <View>
          <Text style={styles.label}>
            Contraseña <Text style={styles.labelImportant}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su contraseña"
            secureTextEntry
            onChangeText={setPassword}
            placeholderTextColor={"rgba(242, 242, 242, .2)"}
          />
          <Text style={styles.line}>
            ___________________________________________
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => login({ email: username, password: password })}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D0D0D",
    color: "#F2F2F2",
  },
  loginContainer: {
    marginTop: 30,
    backgroundColor: "#1A1A1A",
    width: "80%",
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "ultralight",
    marginBottom: 20,
    color: "#F2F2F2",
    textAlign: "center",
  },
  label: {
    color: "#735973",
    margin: 10,
    fontWeight: "ultralight",
  },
  labelImportant: {
    color: "#33CFFF",
  },
  input: {
    color: "#F2F2F2",
    width: "70%",
    height: 40,
    borderWidth: 1,
    borderBottomColor: "#D3C5D3",
    borderLeftColor: "#1A1A1A",
    borderRightColor: "#1A1A1A",
    borderTopColor: "#1A1A1A",
    margin: 10,
    padding: 8,
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
  },
  line: {
    color: "#F2F2F2",
  },
  button: {
    textAlign: "center",
    color: "#F2F2F2",
    backgroundColor: "#00C3FF",
    padding: 12,
    borderRadius: 12,
    fontWeight: "bold",
    marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginScreen;

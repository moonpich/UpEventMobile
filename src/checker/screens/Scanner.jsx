import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function Scanner() {
  const [facing, setFacing] = useState("back");
  const [scanned, setScanned] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();
  const route = useRoute();
  const datosReferencia = route.params?.referenceData

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Necesitamos su permiso para mostrar la cámara.
        </Text>
        <Button
          contentStyle={styles.buttonPermission}
          labelStyle={{ fontSize: 16 }}
          theme={{ colors: { primary: "#F7EBF9" } }}
          onPress={requestPermission}
        >
          Permitir
        </Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function handleBarCodeScanned({ type, data }) {
    if (!scanned) {
      try{
        setScanned(true);
      setIsCameraActive(false);
      
      const qrData = JSON.parse(data);
      console.log("Datos del qr: ", qrData);

      const esValido =
        qrData.idEvent === datosReferencia.idEvent &&
        qrData.event === datosReferencia.event;

        if (esValido) {
          Alert.alert(
            "Acceso Válido",
            `Código QR escaneado exitosamente.\nEvento: ${qrData.event}`, // Mostramos el nombre del evento
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("CheckerAvailableEvents"),
              },
            ]
          );
        } else {
          Alert.alert("Acceso Denegado", "El QR no coincide con los datos esperados.");
        }
      }catch(error){
        Alert.alert("Error", "QR inválido. No se pudo convertir en JSON.");
      console.error("Error al parsear JSON:", error);
      }
      
    }
  }

  return (
    <View style={styles.container}>
      {isCameraActive && (
        <CameraView
          style={styles.camera}
          facing={facing}
          barcodeScannerSettings={{
            barcodeTypes: [
              "qr"
            ],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonPermission: {
    backgroundColor: "#6B2376",
    borderRadius: 12,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    textColor: "#F7EBF9",
    margin: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Century Gothic Bold",
  },
});

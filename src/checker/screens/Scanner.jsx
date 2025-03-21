import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { Button } from "react-native-paper"; 
import { useNavigation } from "@react-navigation/native";


export default function Scanner() {
    const [facing, setFacing] = useState("back");
    const [scanned, setScanned] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(true);
    const [permission, requestPermission] = useCameraPermissions();
    const navigation = useNavigation();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Necesitamos su permiso para mostrar la cámara.</Text>
                <Button contentStyle={styles.buttonPermission} labelStyle={{ fontSize: 16 }} theme={{ colors: { primary: "#F7EBF9" } }} onPress={requestPermission}>
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
            setScanned(true);
            setIsCameraActive(false); 
            Alert.alert("Código Escaneado ", `Tipo: ${type}\nDato: ${data}`, [
                { text: "OK", onPress: () => navigation.navigate("CheckerAvailableEvents")}, // Volver a encender la cámara
            ]);
        }
    }

    return (
        <View style={styles.container}>
            {isCameraActive && (
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e", "code128", "code39", "code93", "itf14", "pdf417"],
                    }}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
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
    },
});
import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '../../global/context/ThemeContext';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { participantsList } from '../../global/data/apiChecker';

const logoUp = () => {
    return require("../../../assets/splash.png");
};

export function List({ route }) {
    const { theme } = useTheme();
    const { idWorkshop } = route.params;
    const navigation = useNavigation();
    const [participants, setParticipants] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const fetchParticipants = async () => {
                const data = await participantsList(idWorkshop);
                if (data) setParticipants(data);
            };

            fetchParticipants();
        }, [idWorkshop])
    );

    const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
            padding: 25,
            backgroundColor: theme.background,
            alignItems: "center",
        },
        talleres: {
            borderWidth: 2,
            borderColor: "#6B2376",
            backgroundColor: theme.backgroundCard,
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
        container: {
            alignItems: "center",
        },
        logo: {
            width: 145,
            height: 35,
            margin: 10,
            marginBottom: 30
        },
        statusCircle: {
            width: 20,
            height: 20,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
        },
        statusText: {
            fontSize: 12,
            color: theme.textColor, 
            fontFamily: "Century Gothic Bold",
        },
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Image style={styles.logo} source={logoUp()} />
            </View>
            <FlatList
                data={participants}
                keyExtractor={(item) => String(item.id)}
                style={{ width: "100%" }}
                renderItem={({ item }) => {
                    const isAttended = item.status;
                    const circleColor = isAttended ? 'red' : 'green';
                    const statusText = isAttended ? 'Pendiente' : 'Asistió';
                    return (
                        <View style={styles.talleres}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.tallerText}>{item.user.name} {item.user.lastname}</Text>
                                <Text style={styles.tallerCupo}>
                                    Email: {item.user.email}
                                </Text>
                            </View>
                            <View style={{marginRight:20, alignItems:'center', alignContent:'space-between'}}>
                                <Text style={styles.statusText}>{statusText}</Text>
                                <View style={[styles.statusCircle, { backgroundColor: circleColor }]} />
                            </View>
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    );
}

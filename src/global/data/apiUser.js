import { Alert } from 'react-native';
import api from '../../config/api';
import * as SecureStore from "expo-secure-store";

export const generarYEnviarQR = async (id_event, id_workshop, name) => {
  try {
    const response = await api.post('/qr/send', {
      email: "20233tn092@utez.edu.mx",
      id_user: "1",
      id_event: id_event,
      id_workshop: id_workshop,
      name: name,
    });

    Alert.alert('QR Enviado', 'Revisa tu correo para recibir el QR.');
  } catch (error) {
    Alert.alert('Error', 'No se pudo enviar el QR.');
  }
};

export const getEvents = async () => {
  try {
    const access_token = await SecureStore.getItemAsync("access_token");
    console.log("Token Guardado:", access_token);

    const response = await api.get('/api/event/events', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      }
    });
    console.log(response.data.result);
    const events = response.data.result;
    return events;
  } catch (error) {
    console.log('Error obteniendo los eventos desde la peticion', error);
    return [];
  }
};
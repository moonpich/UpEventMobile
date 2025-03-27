import axios from 'axios';
import { Alert } from 'react-native';

export const generarYEnviarQR = async (id_event, id_workshop, name) => {
  try {
    const response = await axios.post('http://192.168.0.71:8000/api/qr/send', {
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

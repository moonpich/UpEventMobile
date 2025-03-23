import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import { Alert } from 'react-native';

export const generarYEnviarQR = async (qrRef, id_event, id_workshop, name) => {
  const qrData = {
    id_user: 1,
    name: name,
    id_event: id_event,
    id_workshop: id_workshop,
  };

  if (qrRef.current) {
    qrRef.current.toDataURL(async (dataURL) => {
      try {
        const response = await axios.post('http://localhost:8080/api/qr/recived', {
          ...qrData,
          qrImage: dataURL,
        });

        Alert.alert('QR Enviado', 'Tu QR ha sido enviado correctamente.');
      } catch (error) {
        Alert.alert('Error', 'No se pudo enviar el QR.');
      }
    });
  }
};

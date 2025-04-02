import api from "../../config/api";
import Toast from "react-native-toast-message";
import * as SecureStore from 'expo-secure-store';

export const LoginRequest = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password }, { withCredentials: true });

    if (response.status === 200 && response.data.type === "SUCCESS") {
      console.log("Headers recibidos:", response.headers);
      Toast.show({
        type: "success",
        text1: "Sesion iniciada correctamente"
      })
      
      const cookies = response.headers['set-cookie'];

      if (cookies && cookies.length > 0) {
        const accessTokenCookie = cookies.find(cookie => cookie.startsWith('access_token='));
        
        if (accessTokenCookie) {
          const token = accessTokenCookie.split('=')[1].split(';')[0]; 
          await SecureStore.setItemAsync('access_token', token);
          const tokenGuardado = await SecureStore.getItemAsync('access_token');
          console.log(tokenGuardado);
        }
      }
      return response.data.result.role || "Sesion exitosa";
    } else {
      console.error("Error de autenticacion", response.data.message);
      return null;
    }

  } catch (error) {
    if (error.response) {
      console.error("Error de autenticación, respuesta del servidor: ", error.response);
    } else {
      console.error("Error de autenticación, sin respuesta del servidor: ", error);
    }
    return null;
  }
};

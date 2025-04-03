import api from "../../config/api";
import Toast from "react-native-toast-message";
import * as SecureStore from 'expo-secure-store';

export const LoginRequest = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password }, { withCredentials: true, timeout:5000});

    if (response.status === 200 && response.data.type === "SUCCESS") {
      Toast.show({
        type: "success",
        text1: "Sesion iniciada correctamente"
      })


      //Recibir cookie
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


      return response.data.result.role;
    } else {
      throw new Error("Credenciales invalidas")
    }

  } catch (error) {
    if(error.code==="ECONNABORTED"){
      Toast.show({
        type: "error",
        text1: "Tiempo de espera agotado",
        text2: "No se pudo conectar con el servidor.",
      });
    } else if (error.response) {
      const { status, data } = error.response

      if (status == 401) {
        Toast.show({
          type: "error",
          text1: "Error de autenticacion",
          text2: data.message || "Credenciales invalidas"
        })
      } else {
        Toast.show({
          type: 'error',
          text1: "Error inesperado",
          text2: `Código de error: ${status}`,
        });
      }

      console.log("Error de autenticacion, respuesta del servidor: ", error.response);

    } else if (error.message === "Network Error") {
      Toast.show({
        type: 'error',
        text1: "Error de conexion",
        text2: "No se pudo conectar con el servidor"
      });

      console.log("Error de autenticacion, respuesta del servidor: ", error);
    } else {
      Toast.show({
        type: 'error',
        text1: "Error inesperado",
        text2: "Ocurrio un problema desconocido",
      });

      console.log("Error inesperado", error);
    }
    return null;
  }
};

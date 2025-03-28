import api from "../../config/api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginRequest = async (email, password) => {
  try {
    const response = await api.post("/auth/login",{ email, password });
  
    if (response.status === 200 && response.data.type === "SUCCESS") {

      
      Toast.show({
        type:"success",
        text1:"Sesion iniciada correctamente"
      })
      return response.data.result.role || "Sesion exitosa";
    }else{
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

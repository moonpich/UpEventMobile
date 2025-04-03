import { Alert } from "react-native";
import api from "../../config/api";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

export const generarYEnviarQR = async (id_event, id_workshop, name) => {
  try {
    const response = await api.post("/qr/send", {
      email: "20233tn092@utez.edu.mx",
      id_user: "1",
      id_event: id_event,
      id_workshop: id_workshop,
      name: name,
    });

    Alert.alert("QR Enviado", "Revisa tu correo para recibir el QR.");
  } catch (error) {
    Alert.alert("Error", "No se pudo enviar el QR.");
  }
};

export const getEvents = async () => {
  try {
    const access_token = await SecureStore.getItemAsync("access_token");
    console.log("Token Guardado:", access_token);

    const response = await api.get("/event/events", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(response.data.result);
    const events = response.data.result;
    return events;
  } catch (error) {
    console.log("Error obteniendo los eventos desde la peticion", error);
    return [];
  }
};

export const registerEvent = async (idEvent, email) => {
  try {
    const access_token = await SecureStore.getItemAsync("access_token");
    console.log("Token Guardado:", access_token);
    console.log(idEvent);
    const response = await api.post("/registration/event-register/movil", {
      email,
      idEvent,
    });
    console.log(response.status);
    return Toast.show({
      type: "success",
      text1: "Te has registrado correctamente al evento",
    });
  } catch (error) {
    console.log("Error registrandose a evento", error);
    return [];
  }
};

export const getSaveEvents = async (email) => {
  try {
    const response = await api.post("/registration/own", { email });
    console.log( "Headers de obtener eventos", response.headers);
    const listEvent =  response.data.result;
    return listEvent; 
    /*listEvent.map(({event: {id, name, description, startDate,endDate, status}}) => {
      console.table({id, name, description, startDate
        , endDate, status
      });
    });*/
  } catch (error) {
    console.log("No hay eventos almacenados", error);
    return null;
  }
};

export const registerWorkshop = async (email, idWorkshop) =>{
  try{
    const response = await api.post("/registration/workshop-register", {email, idWorkshop});
    console.log(response.data);
    Toast.show({
      type:"success",
      text1: response.data.message
    })
    return;
  }catch(error){
    console.log(error);
    return;
  }
};

export const getUser= async (email) => {
  try {
    const access_token = await SecureStore.getItemAsync("access_token");
    console.log("Token Guardado:", access_token);

    const response = await api.post("/user/profile", {email}, {headers: {
      Authorization: `Bearer ${access_token}`,
    },});
    console.log(response.data);
    return response.data.result
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateProfile = async (email, phone, password) =>{
  try{
    const access_token = await SecureStore.getItemAsync("access_token");
    console.log("Token Guardado:", access_token);

    let updateData = { email, phone };

    if (password && password.trim() !== "") {
      updateData.password = password; 
    }
    console.log(updateData);

    const response = await api.patch("/user/update", updateData, {headers: {
      Authorization: `Bearer ${access_token}`,
    },});

    console.log(response.data);
    Toast.show({
      type:"success",
      text1: response.data.message
    })
    return;
  }catch(error){
    console.log(response.data.result);
    console.log(error);
    return;
  }
}

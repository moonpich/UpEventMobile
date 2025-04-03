import { Alert } from "react-native";
import api from "../../config/api";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

export const generarYEnviarQR = async (email, idEvent, event, workshop) => {
  try {
    const response = await api.post("/qr/send", {
      email,
      idEvent,
      event,
      workshop
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEvents = async () => {
  try {
    const access_token = await SecureStore.getItemAsync("access_token");

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

    const response = await api.post("/registration/event-register/movil", {
      email,
      idEvent,
    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
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

    const access_token = await SecureStore.getItemAsync("access_token");

    const response = await api.post("/registration/own", { email }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log("Headers de obtener eventos", response.headers);
    const listEvent = response.data.result;
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

export const registerWorkshop = async (email, idWorkshop, idEvent, event, workshop) => {
  try {
    const response = await api.post("/registration/workshop-register", { email, idWorkshop }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(response.data);

    await generarYEnviarQR(email, idEvent, event, workshop);

    Toast.show({
      type: "success",
      text1: response.data.message,
      text2:"Hemos enviado un correo con tu QR de acceso"
    })
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getUser = async (email) => {
  try {
    const access_token = await SecureStore.getItemAsync("access_token");
    console.log("Token Guardado:", access_token);

    const response = await api.post("/user/profile", { email }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(response.data);
    return response.data.result
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateProfile = async (email, phone, password) => {
  try {
    const access_token = await SecureStore.getItemAsync("access_token");
    console.log("Token Guardado:", access_token);

    let updateData = { email, phone };

    if (password && password.trim() !== "") {
      updateData.password = password;
    }
    console.log(updateData);

    const response = await api.patch("/user/update", updateData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log(response.data);
    Toast.show({
      type: "success",
      text1: response.data.message
    })
    return;
  } catch (error) {
    console.log(response.data.result);
    console.log(error);
    return;
  }
}

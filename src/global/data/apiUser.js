import api from "../../config/api";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

export const generarYEnviarQR = async (email, idEvent, event, idWorkshop, workshop) => {
  console.log("entrando a qr");

  try {
    const response = await api.post("/qr/send", {
      email,
      idEvent,
      event,
      idWorkshop,
      workshop
    });

    console.log(response.data);
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
      text2:"Hemos enviado un correo con tu QR de acceso"
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
    console.log("Headers de obtener eventos", response.data.result);

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

export const registerWorkshop = async (email, idEvent, event, idWorkshop, workshop) => {
  const access_token = await SecureStore.getItemAsync("access_token");

  try {
    const response = await api.post("/registration/workshop-register", { email, idWorkshop }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    Toast.show({
      type: "success",
      text1: response.data.message
    })
    return true;
  } catch (error) {
    console.log(error);

    if (error.response && error.response.status === 422) {
      Toast.show({
        type: "error",
        text1: "No puedes registrarte al taller.",
        text2: "Primero debes inscribirte al evento.",
      });
    }
    throw error;
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

export const savedWorkhops = async (email, idEvent) =>{
  try{
    const response = await api.post("/user-workshops/my-workshops", {email, idEvent});
    return response.data.result;
  }catch(error){
    console.log("Error obteniendo talleres inscritos", error);
    return null;
  }
}


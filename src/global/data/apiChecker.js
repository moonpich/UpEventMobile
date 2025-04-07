import api from "../../config/api";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

export const AssignedEvents = async ({ email }) => {
  try {
    const access_token = await SecureStore.getItemAsync("access_token");
    const request = await api.post(
      "/checker/assigned",
      JSON.stringify(
        { email },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
    );

    if (request.status === 204) {
      console.log(request.data);

      return [];
    }

    if (request.status === 404) {
      console.log(request.data);

      return [];
    }
    console.log(request.data.result);

    const workshops = request.data.result[0].event.workshops;
    console.log("W",workshops);

    return request.data.result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const profile = async ({ email }) => {
  try {
    const access_token = await SecureStore.getItemAsync("access_token");
    const reqprofile = await api.post(
      "/user/profile",
      JSON.stringify(
        { email },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
    );

    if (reqprofile === 404) {
      console.log(reqprofile.data);
      return false;
    }

    console.log(reqprofile.data);
    return reqprofile.data.result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const participantsList = async (idWorkshop) => {
  try {
    const access_token = await SecureStore.getItemAsync("access_token");

    const response = await api.post("/user-workshops/workshop/users", {workshopId : idWorkshop}, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log("response de lista de participantes ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};



export const validateQr = async (email, idWorkshop) => {
  try {
    const access_token = await SecureStore.getItemAsync("access_token");

    if (email != null && idWorkshop !== null) {
      const response = await api.patch("/user-workshops/validate-attendance", { email, idWorkshop }, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      },)

      console.log(response.data.message);

      Toast.show({
        type: 'success',
        text1: 'Validación exitosa',
        text2: response.data.message,
      });

      return response;
    }

  } catch (error) {
    console.log(error.response.data.message);
    console.log("Validar QR error: ", error);
    Toast.show({
      type: 'error',
      text1: 'Error al validar',
      text2: error.response?.data?.message || "Error desconocido",
    });
    return;
  }
}
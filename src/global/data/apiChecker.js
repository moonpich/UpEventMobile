import { AwardIcon } from "lucide-react-native";
import api from "../../config/api";
import * as SecureStore from "expo-secure-store";
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
    console.log(request.data);

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

export const participantsList = async (idEvent) => {
  try {
    const access_token = await SecureStore.getItemAsync("access_token");

    const response = await api.get("/registration/participants/{idEvent}",{
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
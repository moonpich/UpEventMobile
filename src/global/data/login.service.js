import api from "../../config/api";

export const LoginRequest = async (email, password) => {
  try {
    const response = await api.post("/auth/login",
      JSON.stringify({ email, password })
    );

    if (response.response.status === 200 && response.data.type === "SUCCESS") {
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

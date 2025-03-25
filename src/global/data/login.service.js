import api from "../../config/api";
export const LoginRequest = async (email, password) => {
  try {
    const request = await api.post(
      "http://localhost:8000/api/auth/login",
      JSON.stringify({ email, password })
    );

    if (request.status !== 200) {
      return false;
    }
    const role = request.data.role;
    if (role === null || role === "") {
      return false;
    }
    return role;
  } catch (error) {
    console.error(error);
  }
};

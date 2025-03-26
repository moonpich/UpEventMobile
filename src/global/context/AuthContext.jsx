import { createContext, useState } from "react";

import api from "../../config/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    role: "",
  });

  const login = async ({ email, password }) => {
    try {
      const request = await api.post(
        "http://192.168.100.66:8000/api/auth/login",
        JSON.stringify({ email, password })
      );

      if (request.status === 200) {
        const role = request.data.role;
        setUser({ email, role });
      }
      throw new Error("Invalid credential");
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

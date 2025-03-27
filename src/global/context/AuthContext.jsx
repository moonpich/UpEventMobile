import { createContext, useState } from "react";
import { LoginRequest } from "../data/login.service";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {

      const role = LoginRequest(email, password)

      if (!role) {
        console.error("Credenciales invalidas");
        return;
      }

       setUser({email, role});
  
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

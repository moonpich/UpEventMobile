import { createContext, useState } from "react";
import { LoginRequest } from "../data/login.service";
import Toast from "react-native-toast-message";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {

      const role = await LoginRequest(email, password);

      if (!role) {
        return;
      }

      setTimeout(()=>{
        setUser({email, role});
      }, 4000);
  
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

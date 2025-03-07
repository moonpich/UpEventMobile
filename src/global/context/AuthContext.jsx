import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const formattedUsername = username.toLowerCase().trim();

    if (formattedUsername === "checker" && password === "checker") {
      setUser({ role: "admin" });
    } else if (formattedUsername === "user" && password === "user") {
      setUser({ role: "user" });
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

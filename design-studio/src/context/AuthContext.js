import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    isActivated: localStorage.getItem("isActivated") === "true",
  });

  const login = (data) => {
    const isActivatedBool = Boolean(data.isActivated);

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("isActivated", isActivatedBool ? "true" : "false");

    setAuth({
      token: data.token,
      role: data.role,
      isActivated: isActivatedBool,
    });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({
      token: null,
      role: null,
      isActivated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

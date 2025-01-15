import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const dispatchAuth = (state, _login = true, _register = false) => {
    setShowAuth(state);
    setLogin(_login);
    setRegister(_register);
  };

  return (
    <AuthContext.Provider value={{ login, register, showAuth, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
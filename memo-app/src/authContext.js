import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleToggleAuth() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleToggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthContext);

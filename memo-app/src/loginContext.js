import React, { useState, createContext, useContext } from "react";

const LoginContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleAuthButtonClick() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, handleAuthButtonClick }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

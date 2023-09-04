import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export function AuthProvider(Props) {
  const [auth, setAuth] = useState({});
  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (email) {
      setAuth({
        token,
        email,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {Props.children}
    </AuthContext.Provider>
  );
}

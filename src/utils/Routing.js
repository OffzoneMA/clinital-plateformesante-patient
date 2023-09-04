import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Profil from "../pages/Profil";
import { AuthContext } from "./AuthContext";
import Connexion from "../pages/Connexion";
const Routing = () => {
  const authContext = useContext(AuthContext);
  //   const login = localStorage.getItem("login");

  return (
    <div>
      <BrowserRouter>
        {authContext.auth.email ? (
          <Routes>
            <Route index path="/" element={<Profil />} />
            <Route exact path="/login//*" element={<Profil />} />
            <Route exact path="/contact" element={<Profil />} />
            <Route path="/profil" element={<Profil />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/*" element={<HomePage />} />
            <Route exact path="/login//*" element={<Connexion />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default Routing;

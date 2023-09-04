import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Register from "../../components/connexion/Register";
import ForgotPassword from "../../components/connexion/ForgotPassword";
import Reinitialize from "../../components/connexion/Reinitialize";
import Inscription from "../../components/connexion/Inscription";
import SucceReg from "../../components/connexion/SucceReg";

function Connexion() {
  return (
    <div className="connexion">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route exact path="forgot-password" element={<ForgotPassword />} />
        <Route exact path="reinitialize-password" element={<Reinitialize />} />
        <Route exact path="inscription" element={<Inscription />} />
        <Route exact path="succes" element={<SucceReg />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default Connexion;

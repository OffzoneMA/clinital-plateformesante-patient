import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MiniFooter from "../../components/footer/MiniFooter";
import Rdv from "../../components/rdv/Rdv";
import "./rdvPage.scss";

function RdvPage() {
  return (
    <div className="rdv-page">
      <Navbar />
      <Rdv />
      <MiniFooter />
    </div>
  );
}

export default RdvPage;

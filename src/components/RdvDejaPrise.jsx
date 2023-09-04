import React from "react";
import MiniFooter from "./footer/MiniFooter";
import Navbar from "../components/navbar/Navbar";

const RdvItem = ({ className }) => {
  return (
    <div className={`item ${className}`}>
      <div className="item-title">
        <h3>Mardi 14 avril</h3>
        <div className="time">
          <img src="../icons/time-outline.svg" alt="" />
          10:00
        </div>
      </div>
      <div className="item-content">
        <div className="item-img">
          <img src="../../images/doctor.jpg" alt="" />
        </div>
        <div className="item-content-container">
          <h3>Dr Mohamed Bouy</h3>
          <span>Médecin généraliste</span>
          <p>
            Clinital - Votre plateforme unique <br />
            01 quartier d’amour et d’innovation
            <br />
            10 000 Rabat
            <br />
            Accès handicapé
            <br />
          </p>
        </div>
      </div>
      <button className={`${className}-btn`}>Concerver Ce RDV</button>
    </div>
  );
};

function RdvDejaPrise() {
  return (
    <div className="rdv-deja-pris">
      <Navbar />
      <div className="rdv-deja-pris-constainer">
        <div className="title">
          <h2>
            Voulez-vous concerver l’ancien rendez-vous ou confirmer votre
            nouveau rendez-vous ?
          </h2>
          <p>
            Vous pouvez conserver le rendez-vous précédent ou le remplacer par
            un nouveau rendez-vous
          </p>
        </div>

        <div className="rdvwrapper">
          <RdvItem className={"prevRdv"} />
          <div className="chooseOther">
            <div className="agenda-next-rdv">
              <span>Ou Choisir un autre RDV</span>
            </div>
            <img src="../../images/agendaScreen.png" alt="" />
          </div>
        </div>

        <div className="rdvwrapper">
          <RdvItem className={"nextRdv"} />
          <div className="chooseOther">
            <div className="agenda-next-rdv">
              <span>Ou Choisir un autre RDV</span>
            </div>
            <img src="../../images/agendaScreen.png" alt="" />
          </div>
        </div>
      </div>
      <MiniFooter />
    </div>
  );
}

export default RdvDejaPrise;

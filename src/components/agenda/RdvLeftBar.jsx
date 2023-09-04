import React from "react";
import { Link } from "react-router-dom";
import CONSTANTS from "../../constant/constant";

function RdvLeftBar({ rdv }) {
  const dayFr =
    rdv.day === "MONDAY"
      ? "Lundi"
      : rdv.day === "TUESDAY"
      ? "Mardi"
      : rdv.day === "WEDNESDAY"
      ? "Mercredi"
      : rdv.day === "THURSDAY"
      ? "Jeudi"
      : rdv.day === "FRIDAY"
      ? "Vendredi"
      : rdv.day === "SATURDAY"
      ? "Samedi"
      : rdv.day === "SUNDAY"
      ? "Dimanche"
      : "None";
  // Format title date

  const getDate = (rdv) => {
    const monthNames = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    const month = Number(rdv.start.slice(5, 7));
    const day = rdv.start.slice(8, 10);

    const formatedDate = dayFr + " " + day + " " + monthNames[month - 1];
    return formatedDate;
  };

  const rdvType = (rdv) => {
    const today = new Date().getTime();
    const tomorrow_ = new Date(new Date());
    const rdvStart = new Date(rdv.start).getTime();
    const tomorrow = tomorrow_.setDate(tomorrow_.getDate() + 1);
    var isClass;
    rdvStart > tomorrow && (isClass = "normal-rdv");
    rdvStart < tomorrow && today < rdvStart && (isClass = "close-rdv");
    today > rdvStart && (isClass = "passed-rdv");
    today > rdvStart &&
      rdv.statut === CONSTANTS.RDV_STATE.ANNULE &&
      (isClass = "annule-passed-rdv");
    rdvStart > tomorrow &&
      rdv.statut === CONSTANTS.RDV_STATE.ANNULE &&
      (isClass = "annule-normal-rdv");
    return isClass;
  };

  const class_ = rdvType(rdv);

  // console.log(rdv);

  return (
    <Link to={`rdv/${rdv.id}`} className={`item ${class_} ${ rdv.statut === CONSTANTS.RDV_STATE.ANNULE_DOC ? 'annule-doc-rdv' : ''}`}>
      <div className="item-title">
        <h3>{getDate(rdv)}</h3>
        <div className="time">
          <img src="../icons/time-outline.svg" alt="" />
          {rdv.start.slice(11, 16)}
        </div>
        {rdv.modeConsultation.mode === "CABINET" ? (
          <img src="../icons/cabinet-white.svg" alt="" />
        ) : rdv.modeConsultation.mode === "VIDEO" ? (
          <img src="../icons/videocam-outline.svg" alt="" />
        ) : rdv.modeConsultation.mode === "DOMICILE" ? (
          <img src="../icons/domicile-outline.svg" alt="" />
        ) : (
          ""
        )}
      </div>
      <div className="item-content">
        <h3>
          {rdv.medecin?.civilite_med?.toLowerCase() +
            " " +
            rdv.medecin?.nom_med?.toLowerCase() +
            " " +
            rdv.medecin?.prenom_med?.toLowerCase()}
        </h3>
        <span>{rdv.medecin?.specialite?.libelle}</span>
        <p>
          Clinital - Votre plateforme unique <br />
          01 quartier d’amour et d’innovation
          <br />
          10 000 Rabat
          <br />
          Accès handicapé
          <br />
        </p>

        <div
          className={
            !rdv.patient?.patient_type
              ? "none"
              : rdv.patient?.patient_type === "MOI"
              ? "moi"
              : "patient"
          }
        >
          {rdv.patient?.patient_type?.toLowerCase() || "none"}
        </div>
      </div>
    </Link>
  );
}

export default RdvLeftBar;

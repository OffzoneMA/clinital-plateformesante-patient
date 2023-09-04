import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CONSTANTS from "../../constant/constant";

function RdvItemAgenda({ rdv, rdvType }) {
  const [classRdv, setClassRdv] = useState("");

  useEffect(() => {
    rdvType(rdv);
    // console.log(rdv);

    // Generate class
    const top = Number(rdv.start.slice(14, 15)) * 10;

    // console.log(rdv.start, top);

    const topClass =
      top >= 0 && top < 10
        ? "_00"
        : top >= 10 && top < 20
        ? "_10"
        : top >= 20 && top < 30
        ? "_20"
        : top >= 30 && top < 40
        ? "_30"
        : top >= 40 && top < 50
        ? "_40"
        : top >= 50 && top < 60
        ? "_50"
        : "-";
    setClassRdv(topClass + " " + rdvType(rdv));
  }, [rdv, rdvType]);

  return (
    <Link to={`rdv/${rdv.id}`} className={`rdv-item ${classRdv} ${ rdv.statut === CONSTANTS.RDV_STATE.ANNULE_DOC ? 'annule-doc-rdv' : ''}`}>
      <div className="item-info">
        <p>Médecin généraliste</p>
        <p>{rdv.start.slice(11, 16)}</p>
      </div>
      <div
        className={`item-patient ${
          !rdv.patient?.patient_type
            ? "none"
            : rdv.patient?.patient_type === "MOI"
            ? "moi"
            : "patient"
          }`}
      >
        <div>{rdv.patient?.patient_type.toLowerCase() || "none"}</div>
      </div>
      {rdv.statut === CONSTANTS.RDV_STATE.ANNULE_DOC && <div className="annule-popover">Votre Rendez-vous a été annulé</div>}
    </Link>
  );
}

export default RdvItemAgenda;

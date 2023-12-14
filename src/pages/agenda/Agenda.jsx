import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getAllRdv, getAllRdvByTooMonth } from "../../action/Rdv";
import { rdvAnnuleFromDoc } from "../../assets/data/data";
import Calendar from "../../components/agenda/Calendar";
import MyRdvs from "../../components/agenda/MyRdvs";
import MiniFooter from "../../components/footer/MiniFooter";
import Navbar from "../../components/navbar/Navbar";
import RdvPopup from "../../components/RdvPopup";
import CONSTANTS from "../../constant/constant";
// import Rdv from "../../components/rdv/Rdv";
import "./agenda.scss";

function Agenda() {
  const [agendaIsChanging, setAgendaIsChanging] = useState();
  // const [allRdvs, setAllRdvs] = useState([]);
  const [rdvs, setRdvs] = useState([]);

  useEffect(() => {
      const month = localStorage.getItem("month");
      getAllRdvByTooMonth(setRdvs, month)
      // getAllRdv(setRdvs)
      // getAllRdv(setAllRdvs)
  }, []);


  const [filter, setFilter] = useState("");
  
  const filtredRdvs = [...rdvs, rdvAnnuleFromDoc].filter((rdv) => {
    const today = new Date().getTime();
    const rdvStart = new Date(rdv.start).getTime();

    if (filter.id) {
      return rdv.patient.id === filter.id;
    }
    if (filter === "") {
      return today <= rdvStart && rdv.statut !== CONSTANTS.RDV_STATE.ANNULE;
    }
    if (filter === CONSTANTS.RDV_STATE.TERMINE) {
      return today > rdvStart && rdv.statut !== CONSTANTS.RDV_STATE.ANNULE;
    }
    if (filter === CONSTANTS.RDV_STATE.ANNULE) {
      return rdv.statut === CONSTANTS.RDV_STATE.ANNULE || rdv.statut === CONSTANTS.RDV_STATE.ANNULE_DOC;
    } else {
      return true;
    }
  });


  return (
    <div className="agenda-page">
      <Navbar />
      <div className="agenda">
        <MyRdvs filter={filter} setFilter={setFilter} rdvs={filtredRdvs} />
        <Calendar rdvs={filtredRdvs} setAgendaIsChanging={setAgendaIsChanging} />
      </div>
      <MiniFooter />

      <Routes>
        <Route exact path="/rdv/:id" element={<RdvPopup />} />
      </Routes>

    </div>
  );
}

export default Agenda;

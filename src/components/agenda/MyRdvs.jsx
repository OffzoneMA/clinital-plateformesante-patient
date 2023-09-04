import React from "react";
import RdvLeftBar from "./RdvLeftBar";
import { useState, useEffect, useRef } from "react";
import { getAllProche } from "../../action/Patient";
import { USER_ID } from "../../services/api";
import CONSTANTS from "../../constant/constant";

function MyRdvs({ rdvs, setFilter, filter }) {
  const filterBox_btn = useRef();
  const filterBox_container = useRef();
  const [filterBox, setFilterBox] = useState(false);
  const [allProche, setAllProche] = useState([]);

  const sortedRdvs = rdvs.sort(function (a, b) {
    return new Date(a.start) - new Date(b.start);
  });

  useEffect(() => {
    getAllProche(setAllProche)
  }, []);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const box = filterBox_container.current;
      const btn = filterBox_btn.current;

      if (box && btn && !box.contains(e.target) && !btn.contains(e.target)) {
        setFilterBox(false);
      }
    });
  }, []);

  const toggleFilter = (e) => {
    setFilter({ id: e.target.getAttribute("aria-label")*1 });
  };

  return (
    <div className="left-bar">
      <div className="titre">
        <h2>Mes rendez-vous</h2>
        <button ref={filterBox_btn} onClick={() => setFilterBox((x) => !x)}>
          <img src="../../icons/filter.svg" alt="" /> Filter
        </button>
        {filterBox && (
          <div className="filter_box" ref={filterBox_container}>
            <div className="filter-container">
              <div className="filter-element">
                <span aria-label={USER_ID} onClick={toggleFilter}>
                  Moi
                </span>
              </div>
              {allProche.length > 1 &&
                <div className="filter-element">
                  <span>Mes Proches</span>
                  <img src="../../icons/flech-black.svg" alt="" />
                  <div className="filter-box-sub filter_box">
                    {allProche.map((proche, index) => (
                      proche.id !== USER_ID && <div className="filter-element" key={index}>
                        <span aria-label={proche.id} onClick={toggleFilter}>
                          {proche.nom_pat} {proche.prenom_pat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>
        )}
      </div>
      <div className="item-container">
        {!sortedRdvs.length ? (
          <div className="empty-rdv-list">
            <img src="../../icons/calendar-clear-outline-empty.svg" alt="" />
            <h2>
              vous n'avez pas de <br /> rendez-vous programmé
            </h2>
          </div>
        ) : (
          <>
            <div className="container">
              <div className="wrapper">
                {sortedRdvs.map((rdv, index) => (
                  <RdvLeftBar key={index} rdv={rdv} />
                ))}
              </div>
            </div>
          </>
        )}
        <div className="btns">
          <button
            className={`delete ${filter === CONSTANTS.RDV_STATE.ANNULE ? "delete-active" : ""}`}
            onClick={() =>
              filter === CONSTANTS.RDV_STATE.ANNULE ? setFilter("") : setFilter(CONSTANTS.RDV_STATE.ANNULE)
            }
          >
            Rendez-vous Annulés
          </button>
          <button
            onClick={() =>
              filter === CONSTANTS.RDV_STATE.TERMINE ? setFilter("") : setFilter(CONSTANTS.RDV_STATE.TERMINE)
            }
            className={filter === CONSTANTS.RDV_STATE.TERMINE ? "archive-active" : ""}
          >
            Rendez-vous Archivés
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyRdvs;

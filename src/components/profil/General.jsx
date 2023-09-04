import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const General = ({ data }) => {
  const [editInpe, setEditInpe] = useState(false);
  const [editPayment, setEditPayment] = useState(false);
  const [editExpertises, setEditExpertises] = useState(false);

  const clickEditInpe = () => {
    setEditInpe(true);
  };
  const clickSauvgardeExpertises = () => {
    setEditExpertises(false);
  };
  /*********************** */
  const clickEditExpertises = () => {
    setEditExpertises(true);
  };
  const clickSauvgardeInpe = () => {
    setEditInpe(false);
  };
  /*********************** */
  const clickEditPayment = () => {
    setEditPayment(true);
  };
  const clickSauvgardePayment = () => {
    setEditPayment(false);
  };

  // const handleChange = (e) => {
  //   setInpe(e.target.value);
  // };
  /******************************************** */

  return (
    <div className="container" id="general">
      <section className="sectionGeneral">
        <div className="hautSec">
          <div className="part1 ">
            <div className="">
              <h5 className="titreDeChamp ">
                <img src="/icons/information-circle.svg" alt="" /> Informations
                légales
              </h5>
              <p className="titreDeChamp p">
                Numéro INPE:
                {editInpe ? (
                  <input
                    defaultValue={data.matricule_med}
                    type="text"
                    className="inputEdit Info inputBorder"
                    onChange=""
                  />
                ) : (
                  <span className="Info">{data.matricule_med}</span>
                )}
              </p>
            </div>
            <div>
              {editInpe ? (
                <button onClick={clickSauvgardeInpe} className="Sauvegarder">
                  Sauvegarder
                </button>
              ) : (
                <img
                  src="/icons/icons_edit.svg"
                  className="iconIdit Info"
                  alt="edit"
                  onClick={clickEditInpe}
                />
              )}
            </div>
          </div>
          <div className="part2">
            <div>
              <h5 className="titreDeChamp">
                <img src="/icons/payment.svg" alt="" /> Moyens de paiement
              </h5>
              {editPayment ? (
                <div>
                  {/* {mPaiement.map((user) => (
                    <input
                      defaultValue={user.type}
                      type="text"
                      className="inputEdit Info inputBorder"
                      onChange=""
                    />
                  ))} */}
                </div>
              ) : (
                <div>
                  {/* {mPaiement.map((user) => (
                    <p className="Info">{user.type}</p>
                  ))} */}
                </div>
              )}
            </div>
            <div>
              {editPayment ? (
                <button onClick={clickSauvgardePayment} className="Sauvegarder">
                  Sauvegarder
                </button>
              ) : (
                <img
                  src="/icons/icons_edit.svg"
                  className="iconIdit"
                  alt="edit"
                  onClick={clickEditPayment}
                />
              )}
            </div>
          </div>
        </div>
        <div className="basSec">
          <div className="expertise">
            <h5 className="titreDeChamp ">
              <img src="/icons/ribbon-outline.svg" alt="" /> Expertises, actes
              et symptômes
            </h5>
            {editExpertises ? (
              <div>
                <input
                  defaultValue="Frottis"
                  type="text"
                  className="inputEdit Info inputBorder"
                  onChange=""
                />
                <input
                  defaultValue="Suivi en gynécologie"
                  type="text"
                  className="inputEdit Info inputBorder"
                  onChange=""
                />
                <input
                  defaultValue="Pilule contraceptive"
                  type="text"
                  className="inputEdit Info inputBorder"
                  onChange=""
                />
                <input
                  defaultValue="Médecine de l'enfant et de l'adolescent"
                  type="text"
                  className="inputEdit Info inputBorder "
                  onChange=""
                />
              </div>
            ) : (
              <div className=" part3">
                <p className="Info bg">Frottis</p>
                <p className="Info  bg">Suivi en gynécologie</p>
                <p className="Info bg ">Pilule contraceptive</p>
                <p className="Info bg">
                  Médecine de l'enfant et de l'adolescent
                </p>
              </div>
            )}
          </div>
          <div>
            {editExpertises ? (
              <button
                onClick={clickSauvgardeExpertises}
                className="Sauvegarder"
              >
                Sauvegarder
              </button>
            ) : (
              <img
                src="/icons/icons_edit.svg"
                className="iconIdit"
                alt="edit"
                onClick={clickEditExpertises}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default General;

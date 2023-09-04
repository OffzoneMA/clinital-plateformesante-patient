import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Presentation = ({ data }) => {
  const [editpresentation, setEditPresentation] = useState(false);
  const [editlangue, setEditLangue] = useState(false);
  const [editDiplome, setEditDiplome] = useState(false);
  const [editExperiences, setEditExperiences] = useState(false);

  const clickEditPresentation = () => {
    setEditPresentation(true);
  };
  const clickSauvgardeExperience = () => {
    setEditExperiences(false);
  };

  const clickEditExperience = () => {
    setEditExperiences(true);
  };
  const clickSauvgardePresentation = () => {
    setEditPresentation(false);
  };

  const clickEditDiplome = () => {
    setEditDiplome(true);
  };
  const clickSauvgardeDiplome = () => {
    setEditDiplome(false);
  };

  const clickEditLangue = () => {
    setEditLangue(true);
  };
  const clickSauvgardeLangue = () => {
    setEditLangue(false);
  };

  return (
    <div id="presentation" className="container">
      <section className="sectionPresentation">
        <div className="section1">
          <div>
            <h5 className="titreDeChamp ">
              <img src="/icons/list.svg" /> Présentation
            </h5>
            <div className="ms">
              {editpresentation ? (
                <div>
                  <textarea
                    defaultValue={data.description_med}
                    type="text"
                    className="inputBorder inputEdit Info disc"
                    onChange=""
                  />
                </div>
              ) : (
                <p className="  Info ">{data.description_med}</p>
              )}
              <div className="imagHistory">
                <img
                  className="me"
                  src="/images/photoMed.png"
                  alt=""
                />
                <img
                  className="me"
                  src="/images/photoCov.png"
                  alt=""
                />
                <img
                  className="me"
                  src="/images/photoCov2.png"
                  alt=""
                />
                <img
                  className="me"
                  src="/images/photoMed.png"
                  alt=""
                />
                <img
                  className="me"
                  src="/images/photoCov.png"
                  alt=""
                />
                <img
                  className="me"
                  src="/images/photoCov2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div>
            {editpresentation ? (
              <button
                onClick={clickSauvgardePresentation}
                className="Sauvegarder"
              >
                Sauvegarder
              </button>
            ) : (
              <img
                src="/icons/icons_edit.svg"
                className="iconIdit Info"
                alt="edit"
                onClick={clickEditPresentation}
              />
            )}
          </div>
        </div>
        <div className="section2 ">
          <div>
            <h5 className="titreDeChamp ">
              <img src="/icons/language.svg" /> Langues parlées
            </h5>
            <div className="ms">
              {editlangue ? (
                <div>
                  <input
                    defaultValue="Anglais et Français"
                    type="text"
                    className="inputBorder inputEdit Info"
                    onChange=""
                  />
                </div>
              ) : (
                <p className=" Info ">Anglais et Français</p>
              )}
            </div>
          </div>
          <div>
            {editlangue ? (
              <button onClick={clickSauvgardeLangue} className="Sauvegarder">
                Sauvegarder
              </button>
            ) : (
              <img
                src="/icons/icons_edit.svg"
                className="iconIdit Info"
                alt="edit"
                onClick={clickEditLangue}
              />
            )}
          </div>
        </div>
        <div className="section3">
          <div className="">
            <h5 className="titreDeChamp ">
              <img src="/icons/diplomeIcon.svg" />
              Diplômes nationaux et universitaires
            </h5>
            <div className="">
              {editDiplome ? (
                <div className="">
                  <input
                    defaultValue="2011"
                    type="text"
                    className="inputEdit Info inputBorder"
                    onChange=""
                  />
                  <span className="trais"></span>
                  <input
                    defaultValue={data.diplome_med}
                    type="text"
                    className="inputEdit Info inputBorder"
                    onChange=""
                  />
                </div>
              ) : (
                <div className="diplome">
                  <p className="titreDeChamp ms  ">2011</p>
                  <span className="trais"></span>
                  <p className="Info inputBorder">
                    {/* D.E.S. Médecine générale - Université Paris 7 - Diderot */}
                    {data.diplome_med}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            {editDiplome ? (
              <button onClick={clickSauvgardeDiplome} className="Sauvegarder">
                Sauvegarder
              </button>
            ) : (
              <img
                src="/icons/icons_edit.svg"
                className="iconIdit Info inputBorder"
                alt="edit"
                onClick={clickEditDiplome}
              />
            )}
          </div>
        </div>

        <div className="section4">
          <div className="">
            <h5 className="titreDeChamp ">
              <img src="/icons/experience.svg" />
              Expériences
            </h5>
            {editExperiences ? (
              <div>
                <div className="">
                  <input
                    defaultValue="Depuis 2015"
                    type="text"
                    className="inputEdit Info inputBorder"
                    onChange=""
                  />
                  <span className="trais"></span>
                  <input
                    defaultValue={data.experience_med}
                    type="text"
                    className="inputEdit Info inputBorder"
                    onChange=""
                  />
                </div>
                <div className="">
                  <input
                    defaultValue="Depuis 2013"
                    type="text"
                    className="inputEdit Info inputBorder"
                    onChange=""
                  />
                  <span className="trais"></span>
                  <input
                    defaultValue={data.experience_med}
                    type="text"
                    className="inputEdit Info inputBorder"
                    onChange=""
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex">
                  <p className="titreDeChamp ms ">Depuis 2015</p>
                  <span className="trais"></span>
                  <p className="Info ">{data.experience_med}</p>
                </div>
                <div className="flex">
                  <p className="titreDeChamp ms  ">Depuis 2013</p>
                  <span className="trais"></span>
                  <p className="Info">{data.experience_med}</p>
                </div>
              </div>
            )}
          </div>
          <div>
            {editExperiences ? (
              <button
                onClick={clickSauvgardeExperience}
                className="Sauvegarder"
              >
                Sauvegarder
              </button>
            ) : (
              <img
                src="/icons/icons_edit.svg"
                className="iconIdit Info"
                alt="edit"
                onClick={clickEditExperience}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Presentation;

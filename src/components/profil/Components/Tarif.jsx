import React, { useState } from "react";

const Tarif = ({ data }) => {
  const [editTarif, setEditTarif] = useState(false);
  const clickEditTarif = () => {
    setEditTarif(true);
  };
  const clickSauvgardeTarif = () => {
    setEditTarif(false);
  };

  return (
    <div id="tarif" className="container">
      <section className="sectionPresentation">
        <div className="">
          <div className=" ">
            <div className="">
              <div className="flex justif">
                <h5 className="titreDeChamp ">
                  <img src="/icons/tarifIcon.svg" alt="" /> Tarifs
                </h5>
                <div>
                  {editTarif ? (
                    <button
                      onClick={clickSauvgardeTarif}
                      className="Sauvegarder"
                    >
                      Sauvegarder
                    </button>
                  ) : (
                    <img
                      src="/icons/icons_edit.svg"
                      className="iconIdit Info"
                      alt="edit"
                      onClick={clickEditTarif}
                    />
                  )}
                </div>
              </div>
              <div className="divTarif">
                <div className="flex justif mb">
                  <div className="flex">
                    <p className="ms  titreDeChamp">
                      Consultation de médecine générale
                    </p>
                    <span className="trais traisTarif"></span>
                  </div>
                  {editTarif ? (
                    <input
                      defaultValue="250 Dh"
                      type="text"
                      className=" inputBorder inputEdit Info"
                      onChange=""
                    />
                  ) : (
                    <p className="ms    prix">250 Dh </p>
                  )}
                </div>
                <div className="flex justif mb">
                  <div className="flex ">
                    <p className="ms  titreDeChamp">
                      Enfant (de moins de 6 ans) - Consultation de pédiatrie
                    </p>
                    <span className="trais traisTarif"></span>
                  </div>
                  {editTarif ? (
                    <input
                      defaultValue="250 Dh"
                      type="text"
                      className="inputEdit Info inputBorder"
                      onChange=""
                    />
                  ) : (
                    <p className="ms-5    prix">200 Dh </p>
                  )}
                </div>
                <div className="flex justif mb">
                  <div className="flex ">
                    <p className="ms  titreDeChamp">Frottis gynécologique</p>
                    <span className="trais traisTarif"></span>
                  </div>
                  {editTarif ? (
                    <input
                      defaultValue="300 Dh"
                      type="text"
                      className="inputEdit Info inputBorder"
                      onChange=""
                    />
                  ) : (
                    <p className="ms  prix">300 Dh </p>
                  )}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tarif;

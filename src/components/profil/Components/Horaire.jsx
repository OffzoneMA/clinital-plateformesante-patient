import React, { useState } from "react";

const Horaire = ({ data }) => {
  const [editContact, setEditContact] = useState(false);


  const clickEditCS = () => {
    setEditContact(true);
  };
  const clickSauvgardeCS = () => {
    setEditContact(false);
  };


  return (
    <div className="container" id="horaire">
      <section className="sectionPresentation">
        <div className="flex justif">
          <div>
            <h5 className="titreDeChamp mb">
              <img src="/icons/timeIcon.svg" alt="" /> Horaires et contacts
            </h5>
          </div>
          <div>
            {editContact ? (
              <button onClick={clickSauvgardeCS} className="Sauvegarder">
                Sauvegarder
              </button>
            ) : (
              <img
                src="/icons/icons_edit.svg"
                className="iconIdit Info"
                alt="edit"
                onClick={clickEditCS}
              />
            )}
          </div>
        </div>
        {editContact ? (
          <div className=" ms flex justif w-75">
            <div>
              <h5 className="titreDeChamp  ">Ouverture du secrétariat</h5>
              <select className="Info select">
                <option value="">Lundi: 8h30 - 18h00 </option>
                <option value="">Mardi: 8h30 - 18h00</option>
                <option value="">Mercredi: 8h30 - 18h00</option>
                <option value="">Jeudi: 8h30 - 18h00</option>
                <option value="">Vendredi: 8h30 - 18h00</option>
                <option value="">Samedi: 8h30 - 12h00</option>
              </select>
            </div>
            <div>
              <h5 className="titreDeChamp "> Contact du secrétariat</h5>
              <input
                defaultValue="05 42 03 49 50"
                type="text"
                className="inputBorder inputEdit Info"
                onChange=""
              />
            </div>
            <div>
              <h5 className="titreDeChamp "> Contact d'urgence</h5>
              <input
                defaultValue="En cas d'urgence, contactez le 15"
                type="text"
                className=" inputBorder inputEdit Info"
                onChange=""
              />
            </div>
          </div>
        ) : (
          <div className="flex ms justif w-75">
            <div>
              <h5 className="titreDeChamp  ">Ouverture du secrétariat</h5>
              <select className="Info  select">
                <option value="">Lundi: 8h30 - 18h00 </option>
                <option value="">Mardi: 8h30 - 18h00</option>
                <option value="">Mercredi: 8h30 - 18h00</option>
                <option value="">Jeudi: 8h30 - 18h00</option>
                <option value="">Vendredi: 8h30 - 18h00</option>
                <option value="">Samedi: 8h30 - 12h00</option>
              </select>
            </div>
            <div>
              <h5 className="titreDeChamp "> Contact du secrétariat</h5>
              <p className="Info">05 42 03 49 50</p>
            </div>
            <div>
              <h5 className="titreDeChamp "> Contact d'urgence</h5>
              <p className="Info">En cas d'urgence, contactez le 15 </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Horaire;

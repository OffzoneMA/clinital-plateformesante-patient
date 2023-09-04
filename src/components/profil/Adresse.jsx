import axios from "axios";
import React, { useEffect, useState } from "react";

const Adress = ({ data }) => {
  const [adresse, setAdresse] = useState([]);
  const [editAdresse, setEditAdresse] = useState(false);
  const [paye, setPaye] = useState([]);
  const [tele, setTele] = useState();
  // const { id } = useParams();

  const clickEditAdresse = () => {
    setEditAdresse(true);
  };
  const clickSauvgardeAdresse = () => {
    setEditAdresse(false);
  };

  return (
    <div id="adresse" className="container">
      <section className="sectionAdresse">
        <div className="leftPart">
          <div>
            <h5 className="titreDeChamp ">
              <img src="/icons/location-outline.svg" alt="" /> Carte et
              informations d'accès
            </h5>
            {editAdresse ? (
              <div>
                <input
                  // defaultValue={data.cabinet.adresse}
                  type="text"
                  className="inputEdit Info inputBorder"
                  onChange=""
                />
                <br />
                <input
                  // defaultValue={data.cabinet.code_post}
                  type="text"
                  className="inputEdit Info inputBorder"
                  onChange=""
                />
                <input
                  // defaultValue={data.ville.nom_pays}
                  type="text"
                  className="inputEdit Info inputBorder"
                  onChange=""
                />
                <br />
                <input
                  defaultValue={data.telephone}
                  type="text"
                  className="inputEdit Info inputBorder"
                  onChange=""
                />
              </div>
            ) : (
              <div className="AdresseInfo">
                <p className=" Info">
                  {/* {data.cabinet.adresse} */}
                  <br />
                  {/* {data.cabinet.code_post} {data.ville.nom_pays} */}
                </p>
                <p className=" Info">{data.telephone}</p>
              </div>
            )}
          </div>
          <div>
            {editAdresse ? (
              <button onClick={clickSauvgardeAdresse} className="Sauvegarder">
                Sauvegarder
              </button>
            ) : (
              <img
                src="/icons/icons_edit.svg"
                className="iconIdit Info"
                alt="edit"
                onClick={clickEditAdresse}
              />
            )}
          </div>
        </div>
        <div className="">
          <div className="imgMap">
            <img src="/icons/Map.png" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Adress;

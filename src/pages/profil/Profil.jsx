import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Navbar from "../../components/navbar/Navbar";
import MiniFooter from "../../components/footer/MiniFooter";
import Adresse from "../../components/profil/Components/Adresse";
import General from "../../components/profil/Components/General";
import Horaire from "../../components/profil/Components/Horaire";
import Tarif from "../../components/profil/Components/Tarif";
import Presentation from "../../components/profil/Components/Presentation";
import "./profil.scss";
import ProfileServices from "../../components/profil/ProfileServices.js/ProfileServices";
import { toast } from "react-toastify";

const Profil = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profilInfo, setProfilInfo] = useState([]);
  const [specialite, setSpecialite] = useState();
  const [loading, setLoading] = useState(false);
  const [viewPhoto, setViewPhoto] = useState(false);
  const { id } = useParams();

  const togglePhoto = () => {
    setViewPhoto(!viewPhoto);
  };
  useEffect(() => {

      setLoading(true);
        ProfileServices.getProfileMedecin(id).then((response) => {
          setProfilInfo(response.data);
        }).catch((error)=>{
          toast.error(error.message)
        }).finally(()=>{
          setLoading(false);
        });

  }, [id]);
  const Loading = () => {
    return (
      <div className="">
        <Skeleton
          className="skelet"
          width={165}
          height={165}
          variant="circular"
        // sx={{ bgcolor: "grey.900" }}
        />
      </div>
    );
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const ActiveClasseMenu = (e) => {
    const allElements = [...document.querySelectorAll(".menu .menuItem")];
    allElements.forEach((element) => element.classList.remove("activeLink"));
    e.target.classList.add("activeLink");
  };
  return (
    <div className="divPrincipal profil-wrapper">
      <Navbar />

      <div className="sectionPic">
        <div className="couverture">
          <img src="/images/couverture.png" alt=" couverture" />
        </div>
        <div className="divProfilImgAndName">
          <div className="photoPro" onClick={toggleMenu}>
            {loading ? <img alt="" src="/images/profile.png" /> : <img alt="" src="/images/profile.png" />}
            <div className={`${"miniMenu"} ${isOpen ? "active" : "inactive"}`}>
              <ul>
                <li onClick={togglePhoto}> Voir La photo de profil </li>
                <li>
                  Mettre à jour la photo de profil{" "}
                  <input type="file" className="PhotoUpload" />
                </li>
                <li> Supprimer la photo de profil</li>
              </ul>
            </div>
            <div
              className={`${"voirPhoto"} ${viewPhoto ? "activePhoto" : "inactive"
                }`}
            >
              <img alt="" id="img" src={profilInfo.photo_med} />
              <img
                alt=""
                onClick={togglePhoto}
                className="cancel"
                src="/icons/cancel.svg"
              />
            </div>
          </div>

          <p className="nomMedcin">
            {profilInfo.nom_med} <span> {profilInfo.prenom_med}</span>
          </p>

          <p className="specialite">{specialite}</p>
        </div>
      </div>

      <div className="menu">
        <a
          className="menuItem activeLink"
          onClick={ActiveClasseMenu}
          href="#general"
        >
          Général
        </a>
        <a
          className="menuItem"
          onClick={ActiveClasseMenu}
          href="#adresse"
        >
          Adresse
        </a>
        <a
          className="menuItem"
          onClick={ActiveClasseMenu}
          href="#presentation"
        >
          Profil
        </a>
        <a
          className="menuItem"
          onClick={ActiveClasseMenu}
          href="#horaire"
        >
          Horaires
        </a>
        <a
          href="#tarif"
          className="menuItem"
          onClick={ActiveClasseMenu}
        >
          Tarifs
        </a>
      </div>

      <div className="sections">
        <General data={profilInfo} />
        <Adresse data={profilInfo} />
        <Presentation data={profilInfo} />
        <Horaire data={profilInfo} />
        <Tarif data={profilInfo} />
      </div>
      <MiniFooter />
    </div>
  );
};

export default Profil;

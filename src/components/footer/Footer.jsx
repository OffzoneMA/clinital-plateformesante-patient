import React from "react";
import MiniFooter from "../footer/MiniFooter";
import "./footer.scss";

const Footer = () => {
  return (
    <>
      <div className="footer-help">
        <div className="container">
          <div>
            <h2>Besoin d'aide ?</h2>
            <p>Consultez notre aide en ligne ou contactez-nous</p>
          </div>
          <button>
            <img src="../icons/help-circle-outline.svg" alt="" />
            Consulter Le Centre D’aide
          </button>
        </div>
      </div>
      <footer>
        <div className="footer-container">
          <div className="container">
            <div className="item">
              <h3>À propos de Clinital</h3>
              <ul>
                <li>Consultation vidéo - Téléconsultation</li>
                <li>À propos de nous</li>
                <li>Nous contacter</li>
                <li>Presse</li>
                <li>Besoin d'aide ?</li>
                <li>Notifications frauduleuses (tentatives de phishing)</li>
              </ul>
              <div>
                <img src="../icons/fb.svg" alt="facebook page" />
                <img src="../icons/linkedin.svg" alt="linkedin page" />
                <img src="../icons/insta.svg" alt="instagram page" />
                <img src="../icons/twitter.svg" alt="twitter page" />
              </div>
            </div>
            <div className="item">
              <h3>Trouvez votre spécialiste</h3>
              <ul>
                <li>Chirurgien-dentiste</li>
                <li>Médecin généraliste</li>
                <li>Pédiatre</li>
                <li>Gynécologue médical et obstétrique</li>
                <li>Ophtalmologue</li>
                <li>Dermatologue et vénérologue</li>
                <li>Ostéopathe</li>
                <li>Masseur-kinésithérapeute</li>
                <li>Pédicure-podologue</li>
                <li>Sage-femme</li>
                <li>
                  <strong>Toutes les spécialités</strong>
                </li>
                <li>
                  <strong>Toutes les expertises</strong>
                </li>
                <li>ORL</li>
                <li>Allergologue</li>
                <li>Chirurgien urologue</li>
                <li>Rhumatologue</li>
                <li>Stomatologue</li>
                <li>Endocrinologue</li>
                <li>Chirurgien orthopédiste</li>
                <li>Diététicien</li>
                <li>Psychologue</li>
                <li>Neurologue</li>
              </ul>
            </div>
            <div className="item">
              <h3>Recherches fréquentes</h3>
              <ul>
                <li>Chirurgien-dentiste</li>
                <li>Médecin généraliste</li>
                <li>Pédiatre</li>
                <li>Gynécologue médical et obstétrique</li>
                <li>Ophtalmologue</li>
                <li>Dermatologue et vénérologue</li>
                <li>Ostéopathe</li>
                <li>Masseur-kinésithérapeute</li>
                <li>Pédicure-podologue</li>
                <li>Sage-femme</li>
              </ul>
            </div>
          </div>
          <div className="search-praticien">
            <h3>Recherche de praticiens</h3>
            <div>
              <p>Nouveaux praticiens réservables </p>
              <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
                <li>F</li>
                <li>G</li>
                <li>H</li>
                <li>I</li>
                <li>J</li>
                <li>K</li>
                <li>L</li>
                <li>M</li>
                <li>N</li>
                <li>O</li>
                <li>P</li>
                <li>Q</li>
                <li>R</li>
                <li>S</li>
                <li>T</li>
                <li>U</li>
                <li>V</li>
                <li>W</li>
                <li>X</li>
                <li>Y</li>
                <li>Z</li>
                <li></li>{" "}
              </ul>
            </div>
          </div>
        </div>
        <MiniFooter />
      </footer>
    </>
  );
};

export default Footer;

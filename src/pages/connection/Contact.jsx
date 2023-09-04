import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

function Contact() {
  return (
    <div className="connexion">
      <Navbar />
      <div className="register contact">
        <div className="container">
          <div className="linear-border"></div>
          <h1>Nous contacter</h1>

          <form>
            <div className="tooInputs">
              <div>
                <label htmlFor="nom">Nom</label>
                <input type="text" id="nom" placeholder="Saisir votre nom" />
              </div>
              <div>
                <label htmlFor="prenom">Prénom</label>
                <input
                  type="text"
                  id="prenom"
                  placeholder="Saisir votre prénom"
                />
              </div>
            </div>
            <div>
              <select
                placeholder="Patient/ Professionnel de santé"
                name="sd"
                id="des"
                value="Patient/ Professionnel de santé"
              >
                <option value="Patient/ Professionnel de santé">
                  Patient/ Professionnel de santé
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="email">Adresse e-mail</label>
              <input
                type="email"
                id="email"
                placeholder="Saisir votre adresse e-mail "
              />
            </div>
            <div>
              <label htmlFor="number">Numéro de téléphone</label>
              <input
                type="tele"
                id="number"
                placeholder="Saisir votre numéro de téléphone"
              />
            </div>
            <div>
              <label htmlFor="message">Votre message </label>
              <textarea
                type="text"
                id="message"
                placeholder="Saisir votre message "
              />
            </div>
            <button>
              Envoyer
              <img src="../icons/flech-white.svg" alt="Envoyer" />
            </button>
          </form>
          <img src="../images/contact-img.png" alt="" />
        </div>
        <div className="bg">
          <img src="../images/connexion-bg.png" alt="" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;

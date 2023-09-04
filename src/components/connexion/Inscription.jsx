import React, { useRef } from "react";
import { Link } from "react-router-dom";

function Inscription() {
  const cnx = useRef();
  const togglePassw = (e) => {
    const input = e.target.parentElement.querySelector("input");
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");
  };
  return (
    <div className="register inscription">
      <div className="container" ref={cnx}>
        <div className="linear-border"></div>

        <h1>Nouveau sur Clinital ?</h1>

        <form>
          <div className="btns">
            <button>
              <img src="../images/facebook.png" alt="connexion avec facebook" />
            </button>
            <button>
              <img src="../images/google.png" alt="connexion avec google" />
            </button>
          </div>
          <div>
            <label htmlFor="number">Numéro de téléphone </label>
            <input
              type="tele"
              id="number"
              placeholder="Saisir votre numéro de téléphone "
            />
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
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="Saisir votre mot de passe"
            />
            <img src="../icons/eye-off.png" alt="" onClick={togglePassw} />
          </div>
          <div>
            <label htmlFor="password-conf">Confimez votre mot de passe</label>
            <input
              type="password"
              id="password-conf"
              placeholder="Saisir votre mot de passe"
            />
            <img src="../icons/eye-off.png" alt="" onClick={togglePassw} />
          </div>
          <div className="checkbox">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              J’accepte les
              <Link to="/login/succes">
                {" "}
                CGU et la Politique de Confidentialité de Clinital
              </Link>
            </label>
          </div>
          <div className="checkbox">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Se souvenir de mon identifiant</label>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              cnx.current.classList.toggle("invalid");
            }}
          >
            S'inscrire
            <img src="../icons/flech-white.svg" alt="se connecter" />
          </button>
          <div className="subForm">
            <h3>J'ai déjà un compte Clinital</h3>
            <Link to="/login">S’identifier</Link>
          </div>
        </form>
        <img src="../images/insc-img.png" alt="" />
      </div>
      <div className="bg">
        <img src="../images/bg-insc.png" alt="" />
      </div>
    </div>
  );
}

export default Inscription;

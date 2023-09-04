import React, { useRef } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const cnx = useRef();
  const togglePassw = (e) => {
    const input = e.target.parentElement.querySelector("input");
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");
  };
  return (
    <div className="register forget-passw">
      <div className="container" ref={cnx}>
        <div className="linear-border"></div>

        <h1>Mot de passe oublié ?</h1>
        <p>
          Renseignez les informations ci-dessous pour récupérer un nouveau mot
          de passe
        </p>

        <form ref={cnx}>
          <div>
            <label htmlFor="email">Adresse e-mail ou Numéro de téléphone</label>
            <input
              type="text"
              id="email"
              placeholder="Saisir votre adresse e-mail ou numéro de téléphone"
            />
          </div>
          <p>Veuillez vérifier les informations saisies, puis réessayez !</p>
          <div>
            <label htmlFor="password">Date de naissance</label>
            <input
              type="password"
              id="password"
              placeholder="Saisir votre date de naissance"
            />
            <img src="../icons/eye-off.png" alt="" onClick={togglePassw} />
          </div>
          <Link to="/login/succes">
            Ou <span>bien une question ?</span>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              cnx.current.classList.toggle("invalid");
            }}
          >
            Réinitialiser mon mot de passe
          </button>
        </form>
        <img src="../images/inv_mdp-img.png" alt="" />
      </div>
      <div className="bg">
        <img src="../images/bg-fgp.png" alt="" />
      </div>
    </div>
  );
}

export default ForgotPassword;

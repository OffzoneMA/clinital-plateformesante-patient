import React from "react";

function Reinitialize() {
  const togglePassw = (e) => {
    const input = e.target.parentElement.querySelector("input");
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");
  };
  return (
    <div className="register forget-passw">
      <div className="container">
        <div className="linear-border"></div>

        <h1>Réinitialisation de votre mot de passe</h1>
        <p>
          Choisissez un nouveau mot de passe à votre compte pour vous connecter
        </p>

        <form>
          <div>
            <label htmlFor="email">Nouveau mot de passe </label>
            <input
              type="text"
              id="email"
              placeholder="Saisir votre nouveau mot de passe"
            />
            <img src="../icons/eye-off.png" alt="" onClick={togglePassw} />
          </div>
          <button>
            Envoyer
            <img src="../icons/flech-white.svg" alt="se connecter" />
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

export default Reinitialize;

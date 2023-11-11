import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./register.scss";

function Register({ comp, setStep, setIsConnected }) {
  const cnx = useRef();
  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const conxBtn = useRef();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const navigator = useNavigate();

  // LogIn
  const connexion = async (e) => {
    e.preventDefault();

    // Inputs validity check
    if (!toggleError()) return false;

    try {
      // Inputs validity check
      setLoading(true);
      const respond = await axios.post(
        "https://apidb.clinital.io/api/auth/signin",
        userCredentials
      );
      // Get user
      const user = {
        email: respond.data.email,
        id: respond.data.id,
        role: respond.data.role,
        telephone: respond.data.telephone,
        token: respond.data.token,
        type: respond.data.type,
      };
      // Save user
      if (user.role === "ROLE_PATIENT") {
        localStorage.setItem("user", JSON.stringify(user)); 

        setLoading(false);
        setError(false);

        comp !== "priseRdv" && (window.location = "/");
        comp === "priseRdv" && setStep(3);
        comp === "priseRdv" && setIsConnected(user);
        // comp === "priseRdv" && addRdv(e, user, 'conx');
        // comp === "priseRdv" && setRdvLoading(true);
      } else {
        setLoading(false);
        toast.error("Ouups! You're not 'patient'");
        return false;
      }
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
      setError(err.message);
    }
  };

  // Hide/show error
  const toggleError = () => {
    const allInputs = [...cnx.current.querySelectorAll("input")];
    const allValid = !allInputs.some((input) => !input.validity.valid);
    !allValid && cnx.current.classList.add("invalid");
    return allValid;
  };
  // Hide/show password
  const togglePassw = (e) => {
    const input = e.target.parentElement.querySelector("input");
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");
  };

  return (
    <div className="register">
      <div className="container">
        <div className="linear-border"></div>
        <h1>J'ai déjà un compte Clinital</h1>

        <form ref={cnx} className={error ? "invalid" : ""}>
          <div>
            <label htmlFor="email">Adresse e-mail ou Numéro de téléphone</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Saisir votre adresse e-mail ou numéro de téléphone"
              required
              onFocus={() => cnx.current.classList.remove("invalid")}
              onChange={(e) => {
                setUserCredentials((x) => {
                  return { ...x, email: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="on"
              placeholder="Saisir votre mot de passe"
              required
              onFocus={() => cnx.current.classList.remove("invalid")}
              onChange={(e) => {
                setUserCredentials((x) => {
                  return { ...x, password: e.target.value };
                });
              }}
            />
            <img src="../../icons/eye-off.png" alt="" onClick={togglePassw} />
          </div>
          <p>Adresse e-mail ou mot de passe incorrect, veuillez réessayer</p>
          <div className="checkbox">
            <input type="checkbox" id="remembre" />
            <label htmlFor="remembre">Se souvenir de mon identifiant</label>
          </div>
          <button ref={conxBtn} onClick={(e) => connexion(e)}>
            {loading ? (
              "Connection..."
            ) : (
              <>
                Se Connecter
                <img src="../../icons/flech-white.svg" alt="se connecter" />
              </>
            )}
          </button>
          <div className="btns">
            <button>
              <img
                src="../../images/facebook.png"
                alt="connexion avec facebook"
              />
            </button>
            <button>
              <img src="../../images/google.png" alt="connexion avec google" />
            </button>
          </div>
          <Link to="forgot-password">Mot de passe oublié ?</Link>
          <div className="subForm">
            <h2>Nouveau sur Clinital ?</h2>
            <Link to="inscription">S’inscrire sur Clinital</Link>
          </div>
        </form>
        {comp !== "priseRdv" && (
          <img src="../../images/connexion-img.png" alt="" />
        )}
      </div>
      {comp !== "priseRdv" && (
        <div className="bg">
          <img src="../../images/connexion-bg.png" alt="" />
        </div>
      )}
      {comp === "priseRdv" && (
        <div className="close-btn" onClick={() => navigator(-1)}></div>
      )}
    </div>
  );
}

export default Register;

import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./register.scss";
import ConnexionService from "./services/ConnexionService";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../utils/redux/GlobalSlice";

function Register({ comp, setStep, setIsConnected }) {
  const cnx = useRef();
  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const conxBtn = useRef();
  const logintoggle =useSelector((state)=>state.global.logintoggle);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const navigator = useNavigate();
  const dispatch=useDispatch();
  const user = useSelector((state)=>state.global.user)
  // LogIn
  const connexion = async (e) => {
    e.preventDefault();

    // Inputs validity check
    if (!toggleError()) return false;

    try {
      // Inputs validity check
      setLoading(true);
      console.log(userCredentials)
      ConnexionService.signin(userCredentials).then((response)=>{
        console.log(response)
        const data = {
          email: response.data.email,
          id: response.data.id,
          role: response.data.role,
          telephone: response.data.telephone,
          token: response.data.token,
          type: response.data.type,
        };
       
        if (data.role === "ROLE_PATIENT") {
          dispatch(setUser(data));
          setError(false);
          comp !== "priseRdv" && (window.location = "/");
          comp === "priseRdv" && setStep(3);
          comp === "priseRdv" && setIsConnected(user);
          // comp === "priseRdv" && addRdv(e, user, 'conx');
          // comp === "priseRdv" && setRdvLoading(true);
        } else {
          toast.error("Ouups! You're not 'patient'");
          return false;
        }

      }).catch((error)=>{
        toast.error("Ouups! Somethig Went Wrong : "+error.message);
      }).finally(()=>{
        setLoading(false);
      })
      // Get user
    
      // Save user
      
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
{console.log(logintoggle)}
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
        !logintoggle ?<div className="bg">
          <img src="../../images/connexion-bg.png" alt="" />
        </div>:null
      )}
      {comp === "priseRdv" && (
      
        <div className="close-btn" onClick={() => navigator(-1)}></div>
      )}
    </div>
  );
}

export default Register;

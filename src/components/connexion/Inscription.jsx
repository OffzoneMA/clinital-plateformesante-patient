import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConnexionService from "./services/ConnexionService";
import { toast } from "react-toastify";
function Inscription() {

  const togglePassw = (e) => {
    const input = e.target.parentElement.querySelector("input");
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");
  };
  const [isAccepted, setIsAccepted] = useState(false)
  const [isRegisred, setisRegistred] = useState(false)
  const [loading, setLoading] = useState(false);
  const [isSame,setIsSame]=useState(true)
  const [formData, setFormData] = useState({
    telephone: "",
    email: "",
    password: "",
    role: "ROLE_PATIENT"
  });

  const cnx = useRef();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    if (isAccepted && isSame) {
      ConnexionService.SignUp(formData)
        .then((Response) => {
          if (Response.status === 200) {
            toast.success("registration has been done Successefully")
            setisRegistred(true);
          }
        }).catch((error)=>{
          toast.error(error.message)
        }).finally(()=>{
          setLoading(false);
        })
    }
    // Here, you can perform form validation and registration logic
    console.log("Form Data:", formData);
    // You can also make API calls to register the user using the form data
    // For example, you can use fetch or axios to send data to the server
  };
const handlepasswordconfirm=(e,password)=>{
  e.preventDefault();
  return e.target.value===password? setIsSame(true): setIsSame(false)
}
  return (
    <div className="register inscription">
      <div className="container" ref={cnx}>
        <div className="linear-border"></div>

       {!isRegisred  ? <> <h1>Nouveau sur Clinital ?</h1>

        <form onSubmit={handleSubmit}>
          <div className="btns">
            <button>
              <img src="../images/facebook.png" alt="connexion avec facebook" />
            </button>
            <button>
              <img src="../images/google.png" alt="connexion avec google" />
            </button>
          </div>
          <div>
            <label htmlFor="telephone">Numéro de téléphone </label>
            <input
              type="tele"
              id="telephone"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Saisir votre numéro de téléphone "
              
            />
          </div>
          <div>
            <label htmlFor="email">Adresse e-mail</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Saisir votre adresse e-mail "
              
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Saisir votre mot de passe"
              
            />
            <img src="../icons/eye-off.png" alt="" onClick={togglePassw} />
          </div>
          <div>
            <label htmlFor="password-conf">Confimez votre mot de passe</label>
            <input
              type="password"
              id="password-conf"
              onChange={(e)=>handlepasswordconfirm(e,formData.password)}
              placeholder="Saisir votre mot de passe"
              
            />
            <img src="../icons/eye-off.png" alt="" onClick={togglePassw} />
            <span className="warning">{!isSame && 'Les mots de passe ne sont pas conformes'}</span>
          </div>
          <div className="checkbox">
            <input type="checkbox" id="terms"
              onChange={() => setIsAccepted(true)} />
            <label htmlFor="terms">
              J’accepte les
              <Link to="/login/succes">
                {" "}
                CGU et la Politique de Confidentialité de Clinital
              </Link>
            </label>
          </div>
          <div className="checkbox">
            <input type="checkbox" id="remember-me"
              onChange={handleChange} />
            <label htmlFor="remember-me">Se souvenir de mon identifiant</label>
          </div>
          <button type="submit"  >
            S'inscrire
            <img src="../icons/flech-white.svg" alt="se connecter" />
          </button>
          <div className="subForm">
            <h3>J'ai déjà un compte Clinital</h3>
            <Link to="/login">S’identifier</Link>
          </div>
        </form>
        <img src="../images/insc-img.png" alt="" />
        </>
        :
        <div className="confirmation">
        <div className="row d-flex">
        <div className="col-md-12">
            <svg className="float-end p-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M11.9518 9.56543L18.6315 2.88574C18.9485 2.56928 19.1269 2.13985 19.1273 1.69192C19.1276 1.24399 18.9501 0.814241 18.6336 0.497224C18.3172 0.180208 17.8877 0.00188743 17.4398 0.00149184C16.9919 0.00109626 16.5621 0.178658 16.2451 0.495115L9.56543 7.1748L2.88574 0.495115C2.56872 0.178098 2.13876 0 1.69043 0C1.2421 0 0.812131 0.178098 0.495115 0.495115C0.178098 0.812131 0 1.2421 0 1.69043C0 2.13876 0.178098 2.56872 0.495115 2.88574L7.1748 9.56543L0.495115 16.2451C0.178098 16.5621 0 16.9921 0 17.4404C0 17.8888 0.178098 18.3187 0.495115 18.6357C0.812131 18.9528 1.2421 19.1309 1.69043 19.1309C2.13876 19.1309 2.56872 18.9528 2.88574 18.6357L9.56543 11.9561L16.2451 18.6357C16.5621 18.9528 16.9921 19.1309 17.4404 19.1309C17.8888 19.1309 18.3187 18.9528 18.6357 18.6357C18.9528 18.3187 19.1309 17.8888 19.1309 17.4404C19.1309 16.9921 18.9528 16.5621 18.6357 16.2451L11.9518 9.56543Z" fill="#A9ACB0" />
            </svg>

          </div>
        </div>
        <div className="row d-flex">
          <div className="col-md-12 text-center my-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="146" height="146" viewBox="0 0 146 146" fill="none">
              <g clip-path="url(#clip0_2_32685)">
                <path d="M73 146C113.317 146 146 113.317 146 73C146 32.6832 113.317 0 73 0C32.6832 0 0 32.6832 0 73C0 113.317 32.6832 146 73 146Z" fill="#5FC657" />
                <path d="M88.362 144.277C89.761 144.005 91.1517 143.692 92.5324 143.339C94.8743 142.686 97.1822 141.917 99.4474 141.034C101.717 140.155 103.942 139.164 106.113 138.063C108.283 136.958 110.397 135.744 112.446 134.427C114.491 133.113 116.47 131.697 118.375 130.186C120.284 128.67 122.116 127.06 123.864 125.362C125.607 123.667 127.265 121.887 128.83 120.027C130.4 118.165 131.875 116.226 133.25 114.217C134.624 112.21 135.897 110.137 137.064 108.003C138.231 105.867 139.289 103.674 140.237 101.432C141.186 99.1905 142.023 96.9024 142.744 94.5768C143.36 92.5414 143.887 90.4799 144.324 88.3984L100.956 45.0309C93.2228 37.2972 83.1238 33.4346 73.0111 33.4346C62.8978 33.4346 52.7757 37.2966 45.042 45.0309C29.5745 60.4984 29.5745 85.4897 45.042 100.957L88.362 144.277Z" fill="#12BF13" />
                <path d="M73.0033 33.4398C83.1165 33.4398 93.2267 37.3024 100.96 45.0362C116.428 60.5037 116.428 85.495 100.96 100.962C85.493 116.43 60.5016 116.43 45.0342 100.962C29.5667 85.495 29.5667 60.5037 45.0342 45.0362C52.7679 37.3024 62.89 33.4398 73.0033 33.4398ZM91.0156 60.8267C90.4395 60.8795 89.8799 61.1008 89.4235 61.4564L67.2051 78.1262L56.9038 67.8249C54.669 65.4973 50.2751 69.8912 52.6027 72.126L64.7694 84.2927C65.7924 85.314 67.5792 85.4424 68.7378 84.5778L93.0711 66.3278C95.1191 64.8372 93.8573 60.8629 91.3246 60.8267C91.2217 60.8214 91.1185 60.8215 91.0156 60.8267Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_2_32685">
                  <rect width="146" height="146" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="title">Un message a été envoyé avec succès</h1>
            <p className="message">Veuillez vérifier votre boîte de réception pour confirmer votre adresse e-mail et accéder instantanément à Clinital</p>
          </div>
        </div>
        <div className="row" Style={"position: absolute; bottom: 0; width: 100%;"}>
          <div className="col-md-12">
            <p className="message">E-mail non reçu ? Vérifiez votre fichier spam ou <span>Renvoyer</span></p>
          </div>
        </div>


      </div>}
      </div>
      <div className="bg">
        <img src="../images/bg-insc.png" alt="" />
        
        
      </div>
    </div>
      
  );
}

export default Inscription;

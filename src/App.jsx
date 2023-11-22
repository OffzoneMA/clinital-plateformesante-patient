import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Profil from "./pages/profil/Profil";
import Result from "./pages/result/Result";
import Contact from "./pages/connection/Contact";
import RdvPage from "./pages/rdvPage/RdvPage";
import HomePage from "./pages/homePage/HomePage";
import Document from "./pages/document/Document";
import Connexion from "./pages/connection/Connexion";
import MonCompte from "./pages/monCompte/MonCompte";
import Agenda from "./pages/agenda/Agenda";
import RdvPopup from "./components/RdvPopup";
// import AgendaWorkDays_ from "./components/result/AgendaWorkDays_";
import RdvDejaPrise from "./components/RdvDejaPrise";
import { verifyAuth } from "./action/Auth";
import LoginModal from "./components/Modals/LoginModal";
import ErrorBoundary from "./components/errors/ErrorBoundery";
import { useSelector } from "react-redux";

export const Log = React.createContext();

function App() {
  const [isValidToken, setIsValidToken] = useState(false)
  //const value = JSON.parse(localStorage.getItem("user"));
 
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || []
  });
  const [test, setTest] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // Token Verification
  useEffect(() => {
    console.log(value.length)
    verifyAuth(setIsValidToken);
  }, []);
  const handleCloseModal = () => {
    setShowModal(false);
    // You might want to redirect to a login page or remove the invalid token.
  };

  return (

    <div className="App">

      {/* {!user && <LoginModal isOpen={showModal} onClose={handleCloseModal} />} */}

      <BrowserRouter>
        <Log.Provider value={value}>
        <ErrorBoundary>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route exact path="/login//*" element={<Connexion />} />
            <Route exact path="/result//*" element={<Result />} />
            <Route exact path="/profil/:id" element={<Profil />} />
            {console.log(isValidToken)}
            {isValidToken &&
              <>
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/agenda//*" element={<Agenda />} />
                <Route exact path="/document" element={<Document />} />
                <Route exact path="/monCompte" element={<MonCompte />} />
                <Route exact path="/rdv/:id" element={<RdvPage />} />
                <Route exact path="/rdv-popup" element={<RdvPopup />} />
                <Route exact path="/rdvdejapris" element={<RdvDejaPrise />} />
              </>
            }
          </Routes>
          </ErrorBoundary>
        </Log.Provider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}


export default App;

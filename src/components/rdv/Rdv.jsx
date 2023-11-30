import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Log } from "../../App";
import { useState } from "react";
import { getRdvById } from "../../action/Rdv";

function Rdv() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useContext(Log);
  const [rdv, setRdv] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // Get rdv by id
  useEffect(() => {
    getRdvById(id, setRdv, setLoading, setError)
    console.log(rdv)
  }, [id]);

  // Get month name
  const getMonthName = (monthNum) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthNum - 1];
  };
  return (
    <div className="rdv-wrapper">
      <div className="bg-close" onClick={() => navigate(-1)}></div>

      {error ? (
        `No Rdv with ID: ${id}`
      ) : !loading ? (
        <>
          <div className="rdv-header">
            {rdv.modeConsultation?.mode !== "VIDEO" ? (
              <div className="rdv-status-message rdv-confirmed">
                <img src="../../icons/done.svg" alt="" />
                <div>
                  <h2>Le rendez-vous est confirmé</h2>
                  <p>
                    Nous venons de vous envoyer un email de confirmation de
                    rendez-vous. <br /> Vous allez également recevoir des
                    rappels à l’approche de votre rendez-vous.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rdv-status-message rdv-uncofirmed">
                <div>
                  <h2>Pour confirmer votre rendez-vous de téléconsultation.</h2>
                  <p>
                    1- Envoyer le justificatif de paiement à votre médecin par
                    e-mail ou partager le document via votre Compte Patient.
                    <br />
                    2- Votre médecin vous enverra un e-mail de confirmation avec
                    les instructions à suivre pour vous rendre à votre
                    rendez-vous.
                  </p>
                </div>
              </div>
            )}
            <div className="rdv-actions">
              <button>
                <img src="../../icons/calendar-clear-outline.svg" alt="" />
                <span>Ajouter à mon Agenda</span>
              </button>
              <button>
                <img src="../../icons/person-outline.svg" alt="" />
                <span>Consulter mon Compte Patient</span>
              </button>
            </div>
          </div>
          <div className="rdv-container">
            <div className="rdv-title">
              <div>
                <img
                  src="../../icons/calendar-clear-outline-white.svg"
                  alt=""
                />
                <span>{`${rdv.day?.toLowerCase()} ${rdv.start.slice(
                  8,
                  10
                )} ${getMonthName(rdv.start.slice(5, 7))}`}</span>
              </div>
              <div>
                <img src="../../icons/time-outline.svg" alt="" />
                <span>{rdv.start.slice(11, 16)}</span>
              </div>
            </div>
            <div className="rdv-content">
              <div className="rdv-info">
                <div className="doc-box">
                  <div className="doc-img">
                    <img src="../../images/doctor.jpg" alt="" />
                  </div>
                  <div>
                    <h3>
                      {rdv.medecin?.civilite_med +
                        " " +
                        rdv.medecin?.nom_med.toLowerCase() +
                        " " +
                        rdv.medecin?.prenom_med.toLowerCase()}
                    </h3>
                    <p>
                      {rdv.medecin?.specialite
                        ? rdv.medecin?.specialite.libelle
                        : "no speciality present"}
                    </p>
                  </div>
                </div>
                <div className="patient-box">
                  <div className="patient-name">
                    <img src="../../icons/person-outline-purple.svg" alt="" />
                    <h4>Nom du Patient</h4>
                  </div>
                  <div className="patient-info">
                    <h4>
                      {rdv.patient?.civilite_pat +
                        " " +
                        rdv.patient?.nom_pat +
                        " " +
                        rdv.patient?.prenom_pat}
                    </h4>
                    <span>
                      {rdv.patient?.dateNaissance?.slice(8, 10) +
                        "/" +
                        rdv.patient?.dateNaissance?.slice(5, 7) +
                        "/" +
                        rdv.patient?.dateNaissance?.slice(0, 4)}
                    </span>
                    <span>|</span>
                    <span>{rdv.patient?.patientTelephone}</span>
                  </div>
                  <div
                    className={
                      rdv.patient?.patient_type === "MOI" ? "me" : "me proche"
                    }
                  >
                    {rdv.patient?.patient_type.toLowerCase()}
                  </div>
                </div>
              </div>

              <div className="patient-document rdv-patient-box">
                <div className="title">
                  <img src="../../icons/document-outline.svg" alt="" />
                  <h4>Documents déjà envoyés</h4>
                </div>
                <div className="content">
                  <p>
                    Vous pouvez partager des documents avec votre praticien pour
                    bien préparer la consultation.
                  </p>
                  <div className="file-box">
                    <img src="../../icons/documents-outline.svg" alt="" />
                    <p>
                      Lettre d’adressage, compte-rendu, résultats d’analyse,
                      ordonnances...
                    </p>
                  </div>
                  <button>Partager Un Document</button>
                </div>
              </div>
              <div className="patient-number rdv-patient-box">
                <div className="title">
                  <img src="../../icons/document-outline.svg" alt="" />
                  <h4>Numéro de téléphone</h4>
                </div>
                <div className="content">
                  <p>
                    no number present
                    {/* +212 5 00 00 00 00 */}
                  </p>
                </div>
              </div>
              <div className="patient-adress rdv-patient-box">
                <div className="title">
                  <img src="../../icons/document-outline.svg" alt="" />
                  <h4>Se rendre au rendez-vous</h4>
                </div>
                <div className="content">
                  <p>
                    no adress present
                    {/* Clinital - Votre plateforme unique <br />
                    01 quartier d’amour et d’innovation <br />
                    10 000 Rabat <br />
                    Accès handicapé */}
                  </p>
                  <img src="../../images/map.png" alt="" />
                </div>
              </div>
              <div className="patient-tarif rdv-patient-box">
                <div className="title">
                  <img src="../../icons/document-outline.svg" alt="" />
                  <h4>Tarifs et remboursements</h4>
                </div>
                <div className="content">
                  <p>
                    Merci de vous munir de votre carte de mutuelle ou de votre
                    attestation de droits à jour.
                  </p>
                </div>
              </div>
              <div className="patient-payment rdv-patient-box">
                <div className="title">
                  <img src="../../icons/document-outline.svg" alt="" />
                  <h4>Moyens de paiement</h4>
                </div>
                <div className="content">
                  <p>
                    no methode present
                    {/* Chèque, espèces, carte bancaire */}

                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default Rdv;

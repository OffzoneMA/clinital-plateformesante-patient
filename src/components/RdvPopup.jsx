import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AgendaWorkDays from "./result/AgendaWorkDays_";
import { cancelRdv, getRdvById, moveRdv } from "../action/Rdv";
import CONSTANTS from "../constant/constant";
import { IconAnnuler, IconCall, IconCard, IconCash, IconDeplacer, IconDocument, IconLocation } from "../assets/icons";
import { addDoc } from "../action/Patient";

function RdvPopup() {
  const fileInput = useRef();
  const { id } = useParams();
  const [rdv, setRdv] = useState({});
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [deleteModel, setDeleteModel] = useState(false);
  const [moveModel, setMoveModel] = useState(false);
  const [newDate, setNewDate] = useState({});
  const [uploadLoading, setUploadLoading] = useState(false);
  const navigate = useNavigate();

    const onFileChange = (e) => setFiles((x) => [...x,{doc: e.target.files[0], fullPath: e.target.value}]);


  const DeleteModel = ({ setDeleteModel,id }) => {
    const navigate = useNavigate()
    return (
      <div className="model-wrapper">
        <div className="bg-close" onClick={() => setDeleteModel(false)}></div>
        <div className="model-container">
          <h2>Voulez-vous vraiment annuler votre rendez-vous</h2>
          <div className="btns-container">
            <button className="close-btn" onClick={() => setDeleteModel(false)}>Fermer</button>
            <button className="delete-btn" onClick={() => {cancelRdv(id); navigate("/agenda")}}>Annuler le RDV</button>
          </div>
        </div>
      </div>
    );
  };
  const MoveModel = ({ setMoveModel, rdvId }) => {
    const [isMoved, setIsMoved] = useState(false)
    return (
      <div className="rdv-wrapper rdv-popup rdv-popup-popup">
        <div className="bg-close" onClick={() => setMoveModel(false)}></div>
        <div className="rdv-container" style={{maxWidth: 750}}>
          <div className="rdv-title">
            <div>
              <img src="../../icons/calendar-clear-outline-white.svg" alt="" />
              <span>DÉPLACER LE RDV</span>
            </div>
            <div className="close-btn" onClick={() => setMoveModel(false)}>
              <img src="../../icons/close.svg" alt="" />
            </div>
          </div>

          <div className="rdv-content">
            <div className="doc-box">
              <div className="doc-img">
                <img src="../../images/doctor.jpg" alt="" />
              </div>
              <div>
                <div>
                  <h3>Dr Partenaire CLINITAL 1</h3>
                  <p>Médecin généraliste</p>
                </div>
                  <span>
                    <img src="../../icons/cabinet-white.svg" alt="" />
                    Au Cabinet
                  </span>
              </div>
            </div>
            <div className="patient-box">
              <div className="patient-name">
                <img src="../../icons/person-outline-purple.svg" alt="" />
                <h4>Nom du Patient</h4>
              </div>
              <div className="patient-info">
                <h4>Mme. Démos CLINITAL</h4>
                <span>15/03/2015</span>
                <span>·</span>
                <span>+212 6 00 00 00 00</span>
              </div>
              <div className="me">Moi</div>
            </div>
            <div className="agenda-container-move">
              <AgendaWorkDays  consId={1} docId={1} state={setNewDate} component="rdvPopup" />
            </div>
            <div className="rdv-action">
              <div className="btns-container">
                <button className="rdv-confirme" onClick={ () => {
                  moveRdv(rdvId, newDate, setIsMoved);
                  isMoved ? navigate('/agenda') : navigate('/rdvdejapris')
                  // console.log(newDate);
                  }}>
                  {/* <Link to="/rdvdejapris"> */}
                    Déplacer LE RDV
                    {/* </Link> */}
                </button>
                <Link to='/result?search=généraliste&page=1'>
                <button className="rdv-other">
                  <span>autre Praticien</span>
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const isRdvPassed = (rdv) => {
    const today = new Date().getTime();
    const rdvStart = new Date(rdv.start).getTime();
    return today > rdvStart;
  };
  
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

  // Get rdv by id
  useEffect(() => { 
    getRdvById(id, setRdv, setLoading)
  }, [id]);

  return (
    <div className="rdv-section">
      {deleteModel && <DeleteModel setDeleteModel={setDeleteModel} id={id} />}
      {moveModel && <MoveModel setMoveModel={setMoveModel} rdvId={id} />}
      <div className="rdv-wrapper rdv-popup">
        <div className="bg-close" onClick={() => navigate(-1)}></div>
        {!loading ? <div className="rdv-container">
          <div
            className="rdv-title"
            style={{ background: rdv.statut === CONSTANTS.RDV_STATE.ANNULE ? "linear-gradient(95deg, #F48888 0%, #F48888 123.19%)" : !isRdvPassed(rdv) ? "linear-gradient(95deg, #6dc0f9 0%, #c989dd 123.19%)" : "linear-gradient(95deg, #888 0%, #888 123.19%)" }}>
            <div>
              <img
                src="../../icons/calendar-clear-outline-white.svg"
                alt=""
              />
              <span>
                {rdv.day?.toLowerCase() + " " + rdv.start?.slice(8,10) + " " + getMonthName(rdv.start?.slice(5, 7))}
              </span>
            </div>
            <div>
              <img src="../../icons/time-outline.svg" alt="" />
              <span>{rdv.start?.slice(11, 16)}</span>
            </div>
            <div className="close-btn" onClick={() => navigate(-1)}>
              <img src="../../icons/close.svg" alt="" />
            </div>
          </div>
          <div className="rdv-content">
            <div className="doc-box">
              <div className="doc-img">
                <img src="../../images/doctor.jpg" alt="" />
              </div>
              <div>
                <div>
                  <h3>{`${rdv.medecin?.civilite_med?.toLowerCase()} ${rdv.medecin?.prenom_med?.toLowerCase()} ${rdv.medecin?.nom_med?.toLowerCase()}`}</h3>
                  <p>{rdv.medecin?.specialite?.libelle}</p>
                </div>
                <span>
                  <img src="../../icons/cabinet-white.svg" alt="" />
                  Au Cabinet
                </span>
              </div>
            </div>
            {!isRdvPassed(rdv) && ([CONSTANTS.RDV_STATE.ENATTENTE, CONSTANTS.RDV_STATE.CONJE].includes(rdv.statut)) && (
              <div className="rdv-action">
                <div className="btns-container">
                  <button
                    className="rdv-deplace"
                    onClick={() => setMoveModel(true)}
                  >
                    <IconDeplacer />
                    <span>Déplacer LE RDV</span>
                  </button>
                  <button
                    className="rdv-annuler"
                    onClick={() => setDeleteModel(true)}
                  >
                    <IconAnnuler />
                    <span>ANNULER LE RDV</span>
                  </button>
                </div>
              </div>
            )}

            <div className="patient-box">
              <div className="patient-name">
                <img src="../../icons/person-outline-purple.svg" alt="" />
                <h4>Nom du Patient</h4>
              </div>
              <div className="patient-info">
                <h4>{`${rdv.patient?.prenom_pat?.toLowerCase()} ${rdv.patient?.nom_pat?.toLowerCase()}`}</h4>
                <span>{rdv.patient?.dateNaissance}</span>
                <span>·</span>
                <span>{rdv.patient?.user?.telephone}</span>
              </div>
              <div className={rdv.patient?.patient_type === 'MOI' ? "me" : "patient"}>{rdv.patient?.patient_type?.toLowerCase()}</div>
            </div>

            {!isRdvPassed(rdv) && ([CONSTANTS.RDV_STATE.ENATTENTE, CONSTANTS.RDV_STATE.CONJE].includes(rdv.statut)) && (
              <div className="patient-document rdv-patient-box">
                <div className="title">
                  <IconDocument />
                  <h4>Documents déjà envoyés</h4>
                  <button onClick={() => files.length > 0 && addDoc(files[0], id, setUploadLoading)}>{uploadLoading ? "Envoyer les documents en cours..." : "Envoyer documents"}</button>
                </div>
                <div className="content">
                  <p>
                    Vous pouvez partager des documents avec votre praticien
                    pour bien préparer la consultation.
                  </p>
                  <div
                    className={`${files.length > 0 ? "" : "empty-files-list"
                      } file-box`}
                  >
                    {files.length > 0 ? (
                      <div className="files-container">
                        {files.map((file, index) => {
                          return (
                            <div key={index} className="file-item">
                              <div className="delete-rdv-icon" onClick={() => setFiles(files.filter( (file,idx) => idx !== index ))}>
                                <img src="../../icons/close.svg" alt="" />
                              </div>
                              <img
                                src="../../icons/document-outline-white.svg"
                                alt=""
                              />
                              <div>
                                <p>{file.doc?.name}</p>
                                <p>
                                  <strong>Dr Partenaire CLINITAL 1</strong>
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <>
                        <img
                          src="../../icons/documents-outline.svg"
                          alt=""
                        />
                        <p>
                          Lettre d’adressage, compte-rendu, résultats
                          d’analyse, ordonnances...
                        </p>
                      </>
                    )}
                  </div>
                  <div className="document-action">
                    <h5>Partager Un Document Depuis</h5>
                    <button>Mes documents</button>
                    <button onClick={() => fileInput.current.click()}>
                      <input
                        ref={fileInput}
                        type="file"
                        onChange={onFileChange}
                      />
                      Mon Ordinateur
                    </button>
                  </div>
                  {/* <button>Partager Un Document</button> */}
                </div>
              </div>
            )}
            <div className="patient-number rdv-patient-box">
              <div className="title">
                <IconCall />
                <h4>Numéro de téléphone</h4>
              </div>
              <div className="content">
                <p>+212 5 00 00 00 00</p>
              </div>
            </div>
            <div className="patient-adress rdv-patient-box">
              <div className="title">
                <IconLocation />
                <h4>Se rendre au rendez-vous</h4>
              </div>
              <div className="content">
                <p>
                  Clinital - Votre plateforme unique <br />
                  01 quartier d’amour et d’innovation <br />
                  10 000 Rabat <br />
                  Accès handicapé
                </p>
                <img src="../../images/map.png" alt="" />
              </div>
            </div>
            <div className="patient-tarif rdv-patient-box">
              <div className="title">
                <IconCash />
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
                <IconCard />
                <h4>Moyens de paiement</h4>
              </div>
              <div className="content">
                <p>Chèque, espèces, carte bancaire </p>
              </div>
            </div>
          </div>
        </div> : 'Loading...'}
      </div>
    </div>
  );
}

export default RdvPopup;

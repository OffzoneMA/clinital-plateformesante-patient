import React from "react";
import { Link } from "react-router-dom";
import AgendaWorkDays from "./AgendaWorkDays";
import AgendaWorkDays_ from "./AgendaWorkDays_";
function DoctorResult({ item, type }) {
  const url = window.location.search;

  // const user = useContext(Log);
  // const [typeConsultation, setTypeConsultation] = useState([]);
  //
  // useEffect(() => {
  //   const fetchTypeConsultation = async () => {
  //     if (!user) {
  //       console.log("Not connected");
  //       return false;
  //     } else {
  //       try {
  //         const res = await axios.get(
  //           `https://apidb.clinital.io/api/med/getTypeConsultationById/${item.id}`,
  //           {
  //             headers: {
  //               Authorization: `${user.type} ${user.token}`,
  //             },
  //           }
  //         );
  //         setTypeConsultation(res.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   console.log("re");
  //   fetchTypeConsultation();
  // }, [item, user]);

  // console.log(typeConsultation);
  return (
    <>
      {item ? (
        <div className="item">
          <div>
            <a href={`profil/x`}>
              <div className="item-info">
                <div className="item-img">
                  <img src="../../images/doctor.jpg" alt="" />
                </div>
                <div className="item-data">
                  <h4>
                    {item.civilite_med +
                      " " +
                      item.prenom_med.toLowerCase() +
                      " " +
                      item.nom_med.toLowerCase()}
                  </h4>
                  <p>Médecin {item.specialite.libelle}</p>
                </div>
                <div className="rdv-type">
                  <span>
                    <img src="../../icons/domicile.svg" alt="" />
                  </span>
                  <span>
                    <img src="../../icons/domicile.svg" alt="" />
                  </span>
                </div>
              </div>
            </a>
            <div className="item-agenda">
                <AgendaWorkDays_
                  consId={1}
                  docId={item.id}
                  component={"doctorResult"}
                />
            </div>
          </div>
          <div className="item-action">
            <div className="item-adress">
              <img src="../../icons/location-outline.svg" alt="" />
              <p>
                {item.ville.nom_ville}, {item.ville.pays.nom_pays}
              </p>
            </div>
            <Link to={`prise-rdv/${url}&id=${item.id}`}>
              Prendre Rendez-Vous
            </Link>
          </div>
        </div>
      ) : (
        <div className="item">
          <div>
            <a href={`profil/x`}>
              <div className="item-info">
                <div className="item-img">
                  <img src="../../images/doctor.jpg" alt="" />
                </div>
                <div className="item-data">
                  <h4>Doc test</h4>
                  <p>Médecin test</p>
                </div>
                <div className="rdv-type">
                  <span>
                    <img src="../../icons/domicile.svg" alt="" />
                  </span>
                  <span>
                    <img src="../../icons/domicile.svg" alt="" />
                  </span>
                </div>
              </div>
            </a>
            <div className="item-agenda">
              <div className="agenda-work-days">
                <div className="agenda-next-rdv">
                  <span>
                    {type === 1
                      ? "Prochain RDV le 6 juin"
                      : "Aucune disponibilité en ligne"}
                  </span>
                </div>
              </div>
              <img
                src="../../images/agendaScreen.png"
                className="testtest"
                alt=""
              />
            </div>
          </div>
          <div className="item-action">
            <div className="item-adress">
              <img src="../../icons/location-outline.svg" alt="" />
              <p>adress test, test</p>
            </div>
            <Link to={url}>Ehhh!, don't click, I'm just a test.</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorResult;

import React from "react";

function Main() {
  return (
    <main className="home-main">
      <div className="container">
        <div className="advantage">
          <div className="item">
            <div className="item-img">
              <img
                src="../images/telecom.png"
                alt="Téléconsultation à tout moment"
              />
            </div>
            <div className="content">
              <h2>Votre téléconsultation à tout moment</h2>
              <p>
                Continuez vos soins à distance, avec vos praticiens qui sont
                disponibles pour une consultation vidéo partout au Maroc.
              </p>
            </div>
          </div>
          <div className="item">
            <div className="item-img">
              <img
                src="../images/health.png"
                alt="documents de santé, toujours avec vous"
              />
            </div>
            <div className="content">
              <h2>Vos documents de santé, toujours avec vous</h2>
              <p>
                Conservez vos documents dans un environnement sécurisé et
                partagez-les avec vos praticiens à tout moment.
              </p>
            </div>
          </div>
          <div className="item">
            <div className="item-img">
              <img src="../images/security.png" alt="Engagement de Clinital" />
            </div>
            <div className="content">
              <h2>Confidentialité : Engagement de Clinital</h2>
              <p>
                La confidentialité de vos informations personnelles est une
                priorité absolue pour Clinital et guide notre action au
                quotidien.
              </p>
            </div>
          </div>
        </div>
        <div className="clinital-pro">
          <div className="container">
            <div className="title">
              <h1>Vous êtes professionnel de santé ?</h1>
              <p>
                Équipez-vous du logiciel Clinital pour assurer la continuité des
                soins en toute sérénité
              </p>
            </div>
            <div className="items-container">
              <div className="item">
                <img src="../icons/more-time.svg" alt="" />
                <p>Libérez du temps médical</p>
              </div>
              <div className="item">
                <img src="../icons/icons-eye.svg" alt="" />
                <p>Développez l'activité de votre cabinet</p>
              </div>
              <div className="item">
                <img src="../icons/solid-hands.svg" alt="" />
                <p>Gagnez en confort de travail</p>
              </div>
              <div className="item">
                <img src="../icons/home-person.svg" alt="" />
                <p>Améliorez l'accès aux soins pour vos patients</p>
              </div>
            </div>
            <button>Decouvrir Clinital PRO</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;

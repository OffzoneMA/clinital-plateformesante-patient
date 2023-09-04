import React from "react";
import "./footer.scss";

function MiniFooter() {
  return (
    <div className="small-footer">
      <div className="container">
        <p>Copyright © 2021 Clinital, tous droits réservés.</p>
        <ul>
          <li>Conditions Générales d'Utilisation</li>
          <li>Mentions légales</li>
          <li>Politique de Confidentialité</li>
          <li>Politique en matière des Cookies</li>
        </ul>
      </div>
    </div>
  );
}

export default MiniFooter;

import React, { useState } from "react";
import { data } from "../../assets/data/data";
import { useEffect } from "react";
import DoumentServices from "./services/DoumentServices";
function Table() {
const [doc,setDoc]=useState({});
useEffect(() => {
  DoumentServices.index()
  .then((respons)=>{
    console.log(respons.data);
    setDoc(respons.data);
  })
  return () => {
    // cleanup
  };
}, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Documents</th>
            <th>Numero</th>
            <th>Type</th>
            <th>Date d'ajout</th>
            <th>Ajouté par</th>
            <th className="">Fichier</th>
          </tr>
        </thead>
        <tbody>
          {doc.map((x, index) => {
            return (
              <tr key={index}>
                <td>
                  <input type="checkbox" name={x.titre_doc} id={x.id_doc} />
                  <label htmlFor={x.id_doc}>{x.titre_doc}</label>
                </td>
                <td>{x.id_doc}</td>
                <td>{x.typeDoc.docType}</td>
                <td>{x.date_ajout_doc}</td>
                <td>{x.auteur}</td>
                <td className="table-action">
                  <img src="../icon/down.svg" alt="" />
                  <img src="../icon/archive.svg" alt="" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

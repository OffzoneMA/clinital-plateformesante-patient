import React, { useState } from "react";
import { data } from "../../assets/data/data";
import { useEffect } from "react";
import DoumentServices from "./services/DoumentServices";
function Table() {
const [doc,setDoc]=useState({});
useEffect(() => {
  DoumentServices.index()
  .then((respons)=>{
    console.log();
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
          {data.map((x, index) => {
            return (
              <tr key={index}>
                <td>
                  <input type="checkbox" name={x.doc} id={x.doc} />
                  <label htmlFor={x.doc}>{x.doc}</label>
                </td>
                <td>{x.num}</td>
                <td>{x.type}</td>
                <td>{x.date}</td>
                <td>{x.added}</td>
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

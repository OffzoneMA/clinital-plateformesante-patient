import React, { useState } from "react";
import { data } from "../../assets/data/data";
import { useEffect } from "react";
import DoumentServices from "./services/DoumentServices";
import ExplorDocument from "./components/ExplorDocument";
function Table() {
const [doc,setDoc]=useState([]);
const [explor,setExplore]=useState(true);
useEffect(() => {
  DoumentServices.index()
  .then((respons)=>{
    console.log(respons.data);
    setDoc(respons.data);
  });
}, []);

const handleExplor=(file)=>{
  console.log(file);
  setDoc(file)
  setExplore(false);
}

  return (<> 
    {explor && 
    <>
      <div className="second-action">
              <div>
                <span>Documents courants</span>
                <span className="redSpan">Documents archivés</span>
              </div>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Recherche"
              />
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.9477 15.6375L13.4561 12.1459C14.2967 11.0268 14.7505 9.66465 14.749 8.265C14.749 4.68988 11.8404 1.78125 8.26524 1.78125C4.69013 1.78125 1.78149 4.68988 1.78149 8.265C1.78149 11.8401 4.69013 14.7487 8.26524 14.7487C9.66489 14.7503 11.0271 14.2965 12.1461 13.4559L15.6378 16.9475C15.8145 17.1055 16.045 17.1898 16.282 17.1832C16.519 17.1765 16.7444 17.0794 16.9121 16.9118C17.0797 16.7442 17.1768 16.5187 17.1834 16.2818C17.1901 16.0448 17.1057 15.8143 16.9477 15.6375ZM3.63399 8.265C3.63399 7.34903 3.90561 6.45362 4.4145 5.69202C4.92339 4.93041 5.64669 4.33681 6.49294 3.98628C7.33919 3.63575 8.27038 3.54404 9.16876 3.72274C10.0671 3.90144 10.8923 4.34252 11.54 4.99021C12.1877 5.6379 12.6288 6.46311 12.8075 7.36149C12.9862 8.25986 12.8945 9.19105 12.544 10.0373C12.1934 10.8836 11.5998 11.6069 10.8382 12.1157C10.0766 12.6246 9.18122 12.8962 8.26524 12.8962C7.03741 12.8948 5.86029 12.4064 4.99208 11.5382C4.12387 10.67 3.63547 9.49283 3.63399 8.265Z"
                  fill="#AAAAAA"
                />
              </svg>
            </div>
            <div className="third-action">
              <button className="sort-by">
                <img src="../icon/sort.svg" alt="" /> filter par
              </button>
              <input type="text" placeholder="Nom de document" />
              <input type="number" placeholder="Numero" />
              <div>
                <label htmlFor="type">Type</label>
                <select>
                  <option></option>
                  <option>Lorem</option>
                  <option>Lorem</option>
                </select>
              </div>
              <div>
                <label htmlFor="duree">
                  <span>Du</span> <span>-</span> <span>au</span>
                </label>
                <select>
                  <option></option>
                  <option>Lorem</option>
                  <option>Lorem</option>
                </select>
              </div>
              <input type="text" placeholder="Ajouté par" />
            </div>
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
                  <label htmlFor={x.id_doc} onClick={()=>{handleExplor(x)}}>{x.titre_doc}</label>
                </td>
                <td>{x.id_doc}</td>
                <td>{x.typeDoc.docType}</td>
                <td>{x.date_ajout_doc}</td>
                <td>{x.auteur}</td>
                <td className="table-action">
                  <img src="/icons/down.svg"  alt="" />
                  <img src="/icons/eye-on.svg" alt="" />
                  <img src="/icons/archive.svg" alt="" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div></>}
    {!explor && (
      <ExplorDocument doc={doc}/>
    )}
    </>);
}

export default Table;

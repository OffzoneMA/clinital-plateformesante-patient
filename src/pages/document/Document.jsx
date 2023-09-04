import React from "react";
import Footer from "../../components/footer/Footer";
import Table from "../../components/document/Table";
import Navbar from "../../components/navbar/Navbar";
import './document.scss'

function Document() {
  const activateSpan = (e) => e.target.classList.toggle("active-span");

  return (
    <>
      <Navbar />
      <div className="document-section">
        <div className="container">
          <div className="action-container">
            <div className="first-action">
              <div className="select">
                <span onClick={activateSpan} className="active-span">
                  Lorem Ipsum Lore
                </span>
                <hr />
                <span onClick={activateSpan}>Lorem Ipsum Lorem Ipsum</span>
                <hr />
                <span onClick={activateSpan}>
                  Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem
                </span>
              </div>
              <button>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_2_175)">
                    <path
                      d="M17.875 9.50684V17.875C17.875 18.422 17.6577 18.9466 17.2709 19.3334C16.8841 19.7202 16.3595 19.9375 15.8125 19.9375H6.1875C5.64049 19.9375 5.11589 19.7202 4.72909 19.3334C4.3423 18.9466 4.125 18.422 4.125 17.875V4.125C4.125 3.57799 4.3423 3.05339 4.72909 2.66659C5.11589 2.2798 5.64049 2.0625 6.1875 2.0625H10.4307C10.7952 2.06256 11.1448 2.20737 11.4026 2.46512L17.4724 8.53488C17.7301 8.79269 17.8749 9.14229 17.875 9.50684Z"
                      stroke="white"
                      strokeWidth="1.375"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 2.40625V7.5625C11 7.92717 11.1449 8.27691 11.4027 8.53477C11.6606 8.79263 12.0103 8.9375 12.375 8.9375H17.5312"
                      stroke="white"
                      strokeWidth="1.375"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 14.5H13.5M10.5 17.5V11.5"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2_175">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Ajouter Un Document
              </button>
            </div>
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
          </div>
          <Table />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Document;

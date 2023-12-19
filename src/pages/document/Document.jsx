import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Table from "../../components/document/Table";
import Navbar from "../../components/navbar/Navbar";
import './document.scss'
import UploadModal from "../../components/document/Modal/UploadDocModal";

function Document() {
  const [isOpen,setIsOpen]=useState(false)
  const activateSpan = (e) => e.target.classList.toggle("active-span");
  const OpenUploadDoc=(e)=>{
      e.preventDefault();
      setIsOpen(!isOpen);
  }

  return (
    <>
      <Navbar />
      {isOpen && <UploadModal isOpen={isOpen} onRequestClose={() => setIsOpen(!isOpen)} />}
      <div className="document-section">
        <div className="container">
          <div className="action-container">
            <div className="first-action">
              <div className="select">
                <span onClick={activateSpan} className="active-span">
                  Mes Documents
                </span>
                <hr />
                <span onClick={activateSpan}>Documents de mes proches</span>
                <hr />
                <span onClick={activateSpan}>
                Documents partagés par un praticien
                </span>
              </div>
              <button onClick={OpenUploadDoc}>
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
            
            <Table />
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Document;

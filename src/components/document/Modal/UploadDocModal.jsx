import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function UploadModal({ isOpen, onRequestClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePatientInputChange = (e) => {
    setSelectedPatient(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("patient", selectedPatient);

    // Make a POST request to your server to upload the file and store the necessary data
    // const response = await fetch('your/upload/url', {
    //   method: 'POST',
    //   body: formData,
    // });

    // Handle the response and close the modal
    onRequestClose();
  };

  return (
    <div className="modal-overlay">
      <button
        onClick={onRequestClose}
        className="btn close-btn"
        style={{ position: "absolute", top: "10px", right: "10px" }}
      >
        Fermer
      </button>
      <div>
        <div className="register">
          <div className="container">
            <div className="linear-border"></div>

            <h2>Ajouter Un Document</h2>
            <form onSubmit={handleSubmit}>
            <div className="input-container">
            <label htmlFor="type">Type de document :</label>
            <div class="click-area">
  Click here to select
  <ul class="dropdown-list">
    <li>Option 1</li>
    <li>Option 2</li>
    <li>Option 3</li>
  </ul>
</div>
            </div>
              <div className="input-container">
                <label htmlFor="nomdoc">Patient concerné:</label>
                <input
                  type="text"
                  id="nomdoc"
                  name="nomdoc"
                  onChange={handlePatientInputChange}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="patient">Patient concerné:</label>
                <input
                  type="text"
                  id="patient"
                  onChange={handlePatientInputChange}
                  required
                />
              </div>
              <button type="submit">Ajoute</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;

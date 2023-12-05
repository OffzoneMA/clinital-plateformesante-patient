import React from 'react';
import './Modal.scss'; // Assuming you have a separate CSS file for styles
import Register from '../connexion/Register';

const LoginModal = ({ isOpen, onClose,user,comp }) => {


  return (
    <div className="modal-overlay">
     <button onClick={onClose} className="close-btn" style={{ position: 'absolute', top: '10px', right: '10px' }}>Fermer</button>
      <div>
      <Register/>
      </div>
    </div>
  );
};

export default LoginModal;

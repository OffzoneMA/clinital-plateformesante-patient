import React from 'react';
import './Modal.scss'; // Assuming you have a separate CSS file for styles
import Register from '../connexion/Register';

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
       <Register/>
      </div>
    </div>
  );
};

export default LoginModal;

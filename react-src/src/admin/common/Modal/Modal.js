import React from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  console.log("Modal rendered, isOpen:", isOpen);

  return (
    <div className="urm-modal-overlay">
      <div className="urm-modal">
        <button className="urm-modal-close" onClick={onClose}>
          <span class="dashicons dashicons-no-alt"></span>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;

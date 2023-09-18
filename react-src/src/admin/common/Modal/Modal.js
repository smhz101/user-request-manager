import React from "react";
import "./Modal.css";

/**
 * Modal component.
 *
 * A generic modal component to display content in an overlay.
 *
 * @param {Object} props - The component's properties.
 * @param {boolean} props.isOpen - Determines if the modal should be displayed.
 * @param {function} props.onClose - Function to close the modal.
 * @param {React.ReactNode} props.children - Content of the modal.
 * @return {React.ReactNode|null} Returns the modal component if isOpen is true, otherwise null.
 */
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="urm-modal-overlay">
      <div className="urm-modal">
        <button className="urm-modal-close" onClick={onClose}>
          <span className="dashicons dashicons-no-alt"></span>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;

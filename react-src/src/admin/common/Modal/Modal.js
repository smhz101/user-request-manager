import React from 'react';
import './Modal.css';

/**
 * Modal component.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {boolean} props.isOpen - Determines if the modal should be displayed.
 * @param {function} props.onClose - Function to be called when the modal is closed.
 * @param {React.ReactNode} props.children - The content to be displayed within the modal.
 * @param {('off-canvas'|'center')} [props.type='center'] - Determines the type of modal. Can be either 'off-canvas' or 'center'.
 * @returns {React.ReactNode|null} The Modal component if `isOpen` is true, otherwise null.
 */
function Modal({ isOpen, onClose, children, type = 'center' }) {
	if (!isOpen) return null;

	const modalClass = type === 'off-canvas' ? 'urm-modal off-canvas' : 'urm-modal center';

	return (
		<div className={`urm-modal-overlay ${type}`}>
			<div className={modalClass}>
				<button className="urm-modal-close" onClick={onClose}>
					<span className="dashicons dashicons-no-alt" />
				</button>
				{children}
			</div>
		</div>
	);
}

export default Modal;

import React from "react";
import { __ } from "@wordpress/i18n"; // Import for internationalization
import "./Input.css";

/**
 * Input component.
 *
 * A generic input component to encapsulate and style the input field with optional label.
 *
 * @param {Object} props - The component's properties.
 * @param {string} [props.label] - Label for the input field.
 * @param {...Object} rest - Any additional props to spread onto the input element.
 * @return {React.ReactNode} Returns the input element wrapped in a div, optionally with a label.
 */
function Input({ label, ...props }) {
  return (
    <div className="urm-input-group">
      {label && <label>{__(label, "user-request-manager")}</label>}
      <input className="urm-input" {...props} />
    </div>
  );
}

export default Input;

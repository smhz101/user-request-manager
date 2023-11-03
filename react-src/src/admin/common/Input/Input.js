import React from "react";
import { __ } from "@wordpress/i18n"; // Import for internationalization
import "./Input.css";

/**
 * Input component.
 *
 * @param {Object} props - The component's properties.
 * @param {string} [props.label] - Label for the input field.
 * @param {string} [props.description] - Description for the input field.
 * @param {string} [props.size] - Size of the input field ('small', 'medium', 'large').
 * @param {string} [props.prefix] - Text or symbol to appear before the input field as a prefix.
 * @param {string} [props.suffix] - Text or symbol to appear after the input field as a suffix.
 * @param {...Object} props - Any additional props to spread onto the input element.
 * @return {React.JSX.Element} Returns the input element wrapped in a div, optionally with a label and description.
 */
function Input({
  label,
  description,
  size = "medium",
  prefix,
  suffix,
  ...props
}) {
  return (
    <div className={`urm-input-group ${size}`}>
      {label && <label>{__(label, "user-request-manager")}</label>}
      <div className={`urm-input-wrapper ${prefix || suffix ? "inline" : ""}`}>
        {prefix && <span className="urm-input-prefix">{prefix}</span>}
        <input className={`urm-input ${size}`} {...props} />
        {suffix && <span className="urm-input-suffix">{suffix}</span>}
      </div>
      {description && (
        <span className="urm-input-description">
          {__(description, "user-request-manager")}
        </span>
      )}
    </div>
  );
}

export default Input;

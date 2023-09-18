import React from "react";
import { __ } from "@wordpress/i18n";
import "./Switch.css";

/**
 * Switch component to render a switch toggle input.
 *
 * @param {Object} props Component properties.
 * @param {string} props.label Label for the switch input.
 * @param {string} [props.className="small"] Optional className to adjust the size of the switch.
 * @returns {JSX.Element} Rendered switch input.
 */
function Switch({ label, className = "small", ...props }) {
  return (
    <label className={`urm-switch-group ${className}`}>
      <input type="checkbox" className="urm-switch-input" {...props} />
      <span className="urm-switch-slider"></span>
      {label && __(label, "user-request-manager")}
    </label>
  );
}

export default Switch;

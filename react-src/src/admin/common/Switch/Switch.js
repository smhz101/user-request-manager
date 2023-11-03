import React from "react";
import { __ } from "@wordpress/i18n";
import "./Switch.css";

/**
 * Switch component to render a switch toggle input.
 *
 * @param description
 * @param {Object} props Component properties.
 * @param {string} props.label Label for the switch input.
 * @param {string} [props.className="small"] Optional className to adjust the size of the switch.
 * @returns {JSX.Element} Rendered switch input.
 */
function Switch({ label, description, className = "small", ...props }) {
  return (
    <div className="urm-switch">
      <div className="urm-switch-wrapper">
        <label className={`urm-switch-group ${className}`}>
          <input type="checkbox" className="urm-switch-input" {...props} />
          <span className="urm-switch-slider" />
        </label>
        {label && (
          <span className="urm-switch-label">
            {__(label, "user-request-manager")}
          </span>
        )}
      </div>
      {description && (
        <span className="urm-input-description">
          {__(description, "user-request-manager")}
        </span>
      )}
    </div>
  );
}

export default Switch;

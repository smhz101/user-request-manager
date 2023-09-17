import React from "react";
import "./Switch.css";

function Switch({ label, className = "small", ...props }) {
  return (
    <label className={`urm-switch-group ${className}`}>
      <input type="checkbox" className="urm-switch-input" {...props} />
      <span className="urm-switch-slider"></span>
      {label}
    </label>
  );
}

export default Switch;

import React from "react";
import "./Input.css";

function Input({ label, ...props }) {
  return (
    <div className="urm-input-group">
      {label && <label>{label}</label>}
      <input className="urm-input" {...props} />
    </div>
  );
}

export default Input;

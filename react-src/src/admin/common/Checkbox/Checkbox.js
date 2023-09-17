import React from "react";
import "./Checkbox.css";

function Checkbox({ label, ...props }) {
  return (
    <label className="urm-checkbox-group">
      <input type="checkbox" {...props} />
      {label}
    </label>
  );
}

export default Checkbox;

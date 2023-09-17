import React from "react";
import "./Radio.css";

function Radio({ label, ...props }) {
  return (
    <label className="urm-radio-group">
      <input type="radio" {...props} />
      {label}
    </label>
  );
}

export default Radio;

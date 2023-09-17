import React from "react";
import "./Select.css";

function Select({ options, label, ...props }) {
  return (
    <div className="urm-select-group">
      {label && <label>{label}</label>}
      <select className="urm-select" {...props}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

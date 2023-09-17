import React from "react";
import "./Textarea.css";

function Textarea({ label, ...props }) {
  return (
    <div className="urm-textarea-group">
      {label && <label>{label}</label>}
      <textarea className="urm-textarea" {...props}></textarea>
    </div>
  );
}

export default Textarea;

import React from "react";
import "./Button.css";

function Button({ children, ...props }) {
  return (
    <button className="urm-button" {...props}>
      {children}
    </button>
  );
}

export default Button;

import React from "react";
import "./Form.css";

function Form({ children, ...props }) {
  return (
    <form className="urm-form" {...props}>
      {children}
    </form>
  );
}

export default Form;

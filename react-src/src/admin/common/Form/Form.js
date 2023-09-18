import React from "react";
import "./Form.css";

/**
 * Form component.
 *
 * A generic form component to encapsulate and style the form content.
 *
 * @param {Object} props - The component's properties.
 * @param {React.ReactNode} props.children - React children elements.
 * @param {...Object} rest - Any additional props to spread onto the form.
 * @return {React.ReactNode} Returns the form element with children content.
 */
function Form({ children, ...props }) {
  return (
    <form className="urm-form" {...props}>
      {children}
    </form>
  );
}

export default Form;

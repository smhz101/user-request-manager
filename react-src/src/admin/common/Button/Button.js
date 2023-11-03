import React from "react";
import { __ } from "@wordpress/i18n";
import "./Button.css";

/**
 * Button component.
 *
 * Renders a custom button or a link based on the 'asLink' prop.
 *
 * @param {Object} props - The component's properties.
 * @param {React.ReactNode} props.children - The content to be displayed within the button.
 * @param {boolean} [props.link=false] - Whether to render the component as a link.
 * @return {React.ReactNode} Returns the button or link element.
 */
function Button({ children, link = false, ...props }) {
  const className = link ? "urm-link" : "urm-button";

  if (link) {
    return (
      <a className={className} {...props}>
        {__(children, "user-request-manager")}
      </a>
    );
  }

  return (
    <button className={className} {...props}>
      {__(children, "user-request-manager")}
    </button>
  );
}

export default Button;

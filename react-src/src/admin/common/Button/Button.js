import React from "react";
import { __ } from "@wordpress/i18n";
import "./Button.css";

/**
 * Button component.
 *
 * Renders a custom button.
 *
 * @param {Object} props - The component's properties.
 * @param {React.ReactNode} props.children - The content to be displayed within the button.
 * @return {React.ReactNode} Returns the button element.
 */
function Button({ children, ...props }) {
  return (
    <button className="urm-button" {...props}>
      {/* @TODO: Ensure that the children passed are string values for proper translation. */}
      {__(children, "user-request-manager")}
    </button>
  );
}

export default Button;

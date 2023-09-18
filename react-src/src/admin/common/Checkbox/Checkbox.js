import React from "react";
import { __ } from "@wordpress/i18n";
import "./Checkbox.css";

/**
 * Checkbox component.
 *
 * Renders a custom checkbox with a label.
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.label - The label to be displayed next to the checkbox.
 * @return {React.ReactNode} Returns the checkbox element with its label.
 */
function Checkbox({ label, ...props }) {
  return (
    <label className="urm-checkbox-group">
      <input type="checkbox" {...props} />
      {/* @TODO: Ensure that the label passed is a string value for proper translation. */}
      {__(label, "user-request-manager")}
    </label>
  );
}

export default Checkbox;

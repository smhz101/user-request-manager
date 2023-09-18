import React from "react";
import { __ } from "@wordpress/i18n";
import "./Radio.css";

/**
 * Radio component to render a radio input field.
 *
 * @param {Object} props Component properties.
 * @param {string} props.label Label for the radio input.
 * @returns {JSX.Element} Rendered radio input.
 */
function Radio({ label, ...props }) {
  return (
    <label className="urm-radio-group">
      <input type="radio" {...props} />
      {__(label, "user-request-manager")}
    </label>
  );
}

export default Radio;

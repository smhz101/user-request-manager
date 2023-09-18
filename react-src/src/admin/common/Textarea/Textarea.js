import React from "react";
import { __ } from "@wordpress/i18n";
import "./Textarea.css";

/**
 * Textarea component to render a custom textarea.
 *
 * @param {Object} props Component properties.
 * @param {string} props.label Label for the textarea.
 * @returns {JSX.Element} Rendered Textarea component.
 */
function Textarea({ label, ...props }) {
  return (
    <div className="urm-textarea-group">
      {label && <label>{__(label, "user-request-manager")}</label>}
      <textarea className="urm-textarea" {...props}></textarea>
    </div>
  );
}

export default Textarea;

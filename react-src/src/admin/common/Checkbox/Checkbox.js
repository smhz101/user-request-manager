import React from "react";
import { __ } from "@wordpress/i18n";
import "./Checkbox.css";

/**
 * Checkbox component.
 *
 * Renders a custom checkbox with a label or an image.
 *
 * @param description
 * @param {Object} props - The component's properties.
 * @param {string} props.label - The label to be displayed next to the checkbox.
 * @param {string} [props.imageSrc] - The source URL of the image to be displayed instead of a checkbox.
 * @return {React.JSX.Element} Returns the checkbox element with its label or image.
 */
function Checkbox({ label, description, imageSrc, ...props }) {
  return (
    <div className={`urm-checkbox-group ${imageSrc ? "image-checkbox" : ""}`}>
      <input type="checkbox" className="hidden-checkbox" {...props} />
      {imageSrc ? (
        <img src={imageSrc} alt={label} className="checkbox-image" />
      ) : (
        <label>{__(label, "user-request-manager")}</label>
      )}
      {description && (
        <span className="urm-input-description">
          {__(description, "user-request-manager")}
        </span>
      )}
    </div>
  );
}

export default Checkbox;

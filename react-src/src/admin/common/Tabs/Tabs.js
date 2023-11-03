import React, { useState, cloneElement } from "react";
import { __ } from "@wordpress/i18n";
import "./Tabs.css";

/**
 * Tabs component to create a tabs navigation and display the associated content.
 *
 * @param {Object} props Component properties.
 * @param {Array<React.ReactElement<{label: string}>>} props.children Tab child components.
 * @returns {JSX.Element} Rendered tabs and content.
 */
function Tabs({ children, direction = "horizontal" }) {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  return (
    <div className={`urm-tabs-container ${direction}`}>
      <ul className="urm-tabs">
        {children.map((child) => {
          const { label } = child.props;
          return (
            <li
              key={label}
              className={activeTab === label ? "active" : ""}
              onClick={() => setActiveTab(label)}
            >
              {__(label, "user-request-manager")}
            </li>
          );
        })}
      </ul>
      {children.map((child) => {
        if (child.props.label !== activeTab) return undefined;
        return cloneElement(child, { active: true });
      })}
    </div>
  );
}

export default Tabs;

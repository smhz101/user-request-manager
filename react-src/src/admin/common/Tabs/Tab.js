import React from "react";

/**
 * Tab component for displaying tab content.
 *
 * @param {Object} props Component properties.
 * @param {boolean} props.active Indicates if the tab is active.
 * @param {React.ReactNode} props.children Content to be displayed within the tab.
 * @returns {JSX.Element} Rendered tab content.
 */
function Tab({ children, active }) {
  return (
    <div className={`tab-content ${active ? "active" : ""}`}>{children}</div>
  );
}

export default Tab;

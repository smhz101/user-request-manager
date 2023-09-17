import React from "react";

function Tab({ children, active }) {
  return (
    <div className={`tab-content ${active ? "active" : ""}`}>{children}</div>
  );
}

export default Tab;

import React, { useState, cloneElement } from "react";
import "./Tabs.css";

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  return (
    <div className="urm-tabs-container">
      <ul className="urm-tabs">
        {children.map((child) => {
          const { label } = child.props;
          return (
            <li
              key={label}
              className={activeTab === label ? "active" : ""}
              onClick={() => setActiveTab(label)}
            >
              {label}
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

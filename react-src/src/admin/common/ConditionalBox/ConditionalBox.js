import React, { useState, useContext } from "react";
import "./ConditionalBox.css";

// Context to share the state between ConditionalBox and its children
const ConditionalContext = React.createContext();

// The main wrapper component
function ConditionalWrapper({ children }) {
  // In ConditionalWrapper
  const [matchedCondition, setMatchedCondition] = useState(null); // initialize to null

  return (
    <div className="ConditionalBox">
      <ConditionalContext.Provider
        value={{ matchedCondition, setMatchedCondition }}
      >
        {children}
      </ConditionalContext.Provider>
    </div>
  );
}

// Component for defining the condition
function CheckCondition({ value, children }) {
  const { setMatchedCondition } = useContext(ConditionalContext);

  const handleInputChange = (e) => {
    // If the input type is a checkbox or radio, use the checked property, otherwise use the value property
    const inputValue =
      e.target.type === "checkbox" || e.target.type === "radio"
        ? e.target.checked
        : e.target.value;

    // Convert the value prop to the correct type (boolean or keep as is)
    const conditionToCheck =
      value === "on" ? true : value === "off" ? false : value;

    setMatchedCondition(inputValue === conditionToCheck);
  };

  // Clone the single child and add the onChange handler to it
  return (
    <div className="Condition">
      {React.cloneElement(React.Children.only(children), {
        onChange: handleInputChange,
      })}
    </div>
  );
}

// Component to display content when the condition is true
function DisplayIfTrue({ children }) {
  const { matchedCondition } = useContext(ConditionalContext);
  return matchedCondition === true ? (
    <div className="True">{children}</div>
  ) : null;
}

// Component to display content when the condition is false
function DisplayIfFalse({ children }) {
  const { matchedCondition } = useContext(ConditionalContext);
  return matchedCondition === false ? (
    <div className="False">{children}</div>
  ) : null;
}

export {
  ConditionalWrapper as ConditionalBox,
  CheckCondition as Condition,
  DisplayIfTrue as True,
  DisplayIfFalse as False,
};

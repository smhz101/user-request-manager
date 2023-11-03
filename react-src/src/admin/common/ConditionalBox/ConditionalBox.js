import React, { useState, useContext } from 'react';
import './ConditionalBox.css';

/**
 * Context to share the state between ConditionalBox and its children.
 * @type {React.Context}
 */
const ConditionalContext = React.createContext();

/**
 * ConditionalWrapper component.
 *
 * A main wrapper component that sets up a context for the children components
 * to share the matched condition state.
 *
 * @param {Object} props - The component's properties.
 * @param {React.ReactNode} props.children - React children elements.
 * @return {React.ReactNode} Returns the wrapped children elements.
 */
function ConditionalWrapper({ children, initialValue, inline }) {
	const [matchedCondition, setMatchedCondition] = useState(!!initialValue);
	const className = inline ? 'ConditionalBox inline' : 'ConditionalBox';

	return (
		<div className={className}>
			<ConditionalContext.Provider value={{ matchedCondition, setMatchedCondition }}>
				{children}
			</ConditionalContext.Provider>
		</div>
	);
}

/**
 * CheckCondition component.
 *
 * A component for defining the condition and managing its state.
 *
 * @param {Object} props - The component's properties.
 * @param {string|boolean} props.value - The value that defines the condition.
 * @param {React.ReactNode} props.children - React child element.
 * @return {React.ReactNode} Returns the child element with an attached onChange handler.
 */
function CheckCondition({ value, children }) {
	const { setMatchedCondition } = useContext(ConditionalContext);

	const handleInputChange = (e) => {
		const inputValue = e.target.type === 'checkbox' || e.target.type === 'radio' ? e.target.checked : e.target.value;

		const conditionToCheck = value === 'on' ? true : value === 'off' ? false : value;

		setMatchedCondition(inputValue === conditionToCheck);
	};

	return (
		<div className="Condition">
			{React.cloneElement(React.Children.only(children), {
				onChange: handleInputChange,
			})}
		</div>
	);
}

/**
 * DisplayIfTrue component.
 *
 * A component to display content when the condition is true.
 *
 * @param {Object} props - The component's properties.
 * @param {React.ReactNode} props.children - React children elements.
 * @return {React.ReactNode|null} Returns the children if the condition is true, otherwise null.
 */
function DisplayIfTrue({ children }) {
	const { matchedCondition } = useContext(ConditionalContext);
	return matchedCondition === true ? <div className="True">{children}</div> : null;
}

/**
 * DisplayIfFalse component.
 *
 * A component to display content when the condition is false.
 *
 * @param {Object} props - The component's properties.
 * @param {React.ReactNode} props.children - React children elements.
 * @return {React.ReactNode|null} Returns the children if the condition is false, otherwise null.
 */
function DisplayIfFalse({ children }) {
	const { matchedCondition } = useContext(ConditionalContext);
	return matchedCondition === false ? <div className="False">{children}</div> : null;
}

export {
	ConditionalWrapper as ConditionalBox,
	CheckCondition as Condition,
	DisplayIfTrue as True,
	DisplayIfFalse as False,
};

import React, { createContext, useContext } from 'react';

/**
 * React context for radio group.
 * @type {React.Context}
 */
const RadioGroupContext = createContext();

/**
 * RadioGroup component.
 * A component that provides context to all its `Radio` children.
 *
 * @param {Object} props - The component's properties.
 * @param {React.ReactNode} props.children - React children elements.
 * @param {string} props.name - The name attribute for all `Radio` components within this group.
 * @param {function} props.onChange - Function to call when any `Radio` within the group is changed.
 * @returns {React.JSX.Element} Wrapped children elements.
 */
function RadioGroup({ children, name, onChange }) {
	return (
		<RadioGroupContext.Provider value={{ name, onChange }}>
			<div>{children}</div>
		</RadioGroupContext.Provider>
	);
}

/**
 * useRadioGroup custom hook.
 * A hook that allows `Radio` components to access the `RadioGroup` context.
 *
 * @throws {Error} Throws an error if used outside of `RadioGroup`.
 * @returns {Object} The `name` and `onChange` values from the `RadioGroup` context.
 */
export function useRadioGroup() {
	const context = useContext(RadioGroupContext);
	if (!context) {
		throw new Error('useRadioGroup must be used within a RadioGroup');
	}
	return context;
}

export default RadioGroup;

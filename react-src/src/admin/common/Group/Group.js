import React from 'react';
import './Group.css';

/**
 * A component for grouping other components.
 *
 * @param {object} props - The props for the component.
 * @param {string} props.className - Additional classes for the wrapper.
 * @param {object} props.style - Additional styles for the wrapper.
 * @param {string} props.title - The title of the component group.
 * @param {boolean} props.showTitle - Whether to show the title.
 * @param {function} props.renderFooter - Function to render the footer.
 * @param {React.ReactNode} props.children - The child components.
 */
const Group = ({ className = '', style = {}, title = '', showTitle = true, renderFooter = null, children }) => (
	<div className={`group-element ${className}`} style={style}>
		{showTitle && <h3>{title}</h3>}
		<div className="group-body">{children}</div>
		{renderFooter && <div className="group-footer">{renderFooter()}</div>}
	</div>
);

export default Group;

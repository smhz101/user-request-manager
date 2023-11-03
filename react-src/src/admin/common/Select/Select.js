import React from 'react';
import { __ } from '@wordpress/i18n';
import './Select.css';

/**
 * Select component to render a dropdown select input field.
 *
 * @param {Object} props Component properties.
 * @param {Array<{value: string, label: string}>} props.options Options for the dropdown.
 * @param {string} props.label Label for the select input.
 * @returns {JSX.Element} Rendered select input.
 */
function Select({ options, label, ...props }) {
	return (
		<div className="urm-select-group">
			{label && <label>{__(label, 'wp-auctionify')}</label>}
			<select className="urm-select" {...props}>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{__(option.label, 'user-request-manager')}
					</option>
				))}
			</select>
		</div>
	);
}

export default Select;

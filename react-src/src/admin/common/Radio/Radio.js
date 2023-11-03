import React from 'react';
import { __ } from '@wordpress/i18n';

import { useRadioGroup } from '../RadioGroup/RadioGroup';

import './Radio.css';

/**
 * Radio component to render a radio input field.
 *
 * @param {Object} props Component properties.
 * @param {string} props.label Label for the radio input.
 * @param {string} [props.description] - Description for the input field.
 * @param {string} [props.imageSrc] - Image URL for the radio option.
 * @returns {JSX.Element} Rendered radio input.
 */
function Radio({ label, description, imageSrc, ...props }) {
	const { name, onChange } = useRadioGroup();
	return (
		<div className="urm-radio-group">
			<input type="radio" name={name} onChange={onChange} id={props.value} className="urm-radio-input" {...props} />
			<label htmlFor={props.value} className="urm-radio-label">
				{imageSrc ? (
					<img src={imageSrc} alt={label} className="urm-radio-image" />
				) : (
					<span>{__(label, 'wp-auctionify')}</span>
				)}
			</label>
			{description && <span className="urm-input-description">{__(description, 'wp-auctionify')}</span>}
		</div>
	);
}

export default Radio;

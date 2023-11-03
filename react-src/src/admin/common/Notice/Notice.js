import React, { useState, useEffect } from 'react';
import './Notice.css';

/**
 * NoticeBar Component.
 *
 * A generic, reusable notice bar component to display different types of notices.
 *
 * @param {string} type - The type of the notice. It can be "info", "success", "error", or "warning".
 * @param {string} message - The message to display in the notice bar.
 * @param {React.ReactNode} [icon=null] - Optional icon to display before the message.
 * @param {boolean} [dismissable=false] - Determines if the notice bar can be manually dismissed.
 * @param {number} [autoDismissTime=0] - The time in milliseconds after which the notice will auto-dismiss. 0 means it won't auto-dismiss.
 * @returns {React.ReactNode|null} Returns the NoticeBar component.
 */
function Notice({ type, message, dismissable = false, autoDismissTime = 0, icon = null }) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		if (autoDismissTime > 0) {
			const timer = setTimeout(() => {
				setIsVisible(false);
			}, autoDismissTime);

			return () => clearTimeout(timer);
		}
	}, [autoDismissTime]);

	if (!isVisible) return null;

	return (
		<div className={`notice-bar ${type}`}>
			{icon && <span className="notice-icon">{icon}</span>}
			<span className="notice-message" dangerouslySetInnerHTML={{ __html: message }} />
			{dismissable && (
				<button className="dismiss-button" onClick={() => setIsVisible(false)}>
					×
				</button>
			)}
		</div>
	);
}

export default Notice;

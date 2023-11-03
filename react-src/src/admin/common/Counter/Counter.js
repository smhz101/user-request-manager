import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

import './Counter.css';

const renderCountDownHtml = (formatted) => {
	return Object.keys(formatted).map((key) => {
		return (
			<div key={`${key}`} className={`countdown bordered ${key}-box`}>
				<span className={`num item ${key}`}>{formatted[key]}</span>
				<span>{key}</span>
			</div>
		);
	});
};

/**
 * Counter component to display a countdown timer.
 *
 * @param {Object} props - The component's properties.
 * @param {number} props.targetDate - The target date to countdown to in milliseconds.
 * @param {string} [props.className] - Optional additional className for styling.
 * @return {React.ReactNode} Returns the countdown timer element.
 */
function Counter({ targetDate, className }) {
	const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(targetDate - Date.now());
		}, 1000);

		return () => clearInterval(timer);
	}, [targetDate]);

	// Renderer callback with condition
	const renderer = ({ formatted, completed }) => {
		if (completed) {
			return <span>Time's up!</span>;
		}

		return renderCountDownHtml(formatted);
	};

	return (
		<div className={`countdown-container ${className ? className : ''}`}>
			<Countdown date={targetDate} renderer={renderer} />
		</div>
	);
}

export default Counter;

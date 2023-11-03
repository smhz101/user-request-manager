import React from 'react';
import './Loader.css';

const Loader = ({ message, style }) => {
	const loaderSpanCounts = {
		1: 0,
		2: 3,
		3: 0,
		4: 3,
		5: 4,
		6: 4,
		7: 0,
		8: 0,
	};

	const spanCount = loaderSpanCounts[style] || 0;
	const spans = Array.from({ length: spanCount }, (_, i) => <span key={i} />);

	return (
		<div className="loader-container">
			{message && <h3 className="loader-message">{message}</h3>}
			<div className="col">
				<div className="loader" id={`loader-${style}`}>
					{spans}
				</div>
			</div>
		</div>
	);
};

export default Loader;

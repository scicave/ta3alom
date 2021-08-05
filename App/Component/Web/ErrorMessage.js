import React from "react";

const ErrorMessage = ({ color, size, weight, errors, name }) => {
	if (!errors[name]) return null;
	return (
		<p style={{ color: color, fontSize: size, fontWeight: weight }}>
			{errors[name]}
		</p>
	);
};

export default ErrorMessage;

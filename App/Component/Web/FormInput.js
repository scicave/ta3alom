import React from "react";
import ErrorMessage from "./ErrorMessage";

const FormInput = ({
	name,
	values,
	onChange,
	errors,
	width,
	radius,
	border,
	bgColor,
	foSize,
	color,
	...otherProps
}) => {
	return (
		<>
			<label htmlFor={name} className="form-label">
				{name}
			</label>
			<input
				style={{
					width: width,
					radius: radius,
					border: border,
					backgroundColor: bgColor,
					fontSize: foSize,
					color: color,
				}}
				name={name}
				id={name}
				value={values[name]}
				onChange={onChange}
				{...otherProps}
			/>
			<ErrorMessage
				color="#f00e0e"
				size="1rem"
				weight="bold"
				errors={errors}
				name={name}
			/>
		</>
	);
};

export default FormInput;

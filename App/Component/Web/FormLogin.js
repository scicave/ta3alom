import React, { useState } from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

// BackEnd Services
import http from "../../services/httpService";
import { apiUrl } from "../../config/config.json";
import * as authService from "../../services/authService";

const FormLogin = () => {
	const [values, setValues] = useState({
		username: "",
		password: "",
	});
	const [checked, setChecked] = useState(false);
	const [errors, setErrors] = useState({});
	const [isPasswordShown, setIsPasswordShown] = useState(false);

	const schema = {
		username: Joi.string()
			.alphanum()
			.min(3)
			.max(30)
			.required()
			.label("Username"),
		password: Joi.string().required().min(8).label("Password"),
	};

	const validate = () => {
		const result = Joi.validate(values, schema, { abortEarly: false });
		if (!result.error) return null;

		const errors = {};
		for (let item of result.error.details) errors[item.path[0]] = item.message;

		return errors;
	};

	const handleSubmit = async e => {
		e.preventDefault();
		console.log(checked);

		setErrors(validate());
		if (errors) return;

		//calling backend
		try {
			const { username, password } = values;
			const history = useHistory();
			const { data: jwt } = await authService.login(username, password);
			localStorage.setItem("token", jwt);
			history.push("/");
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...errors };
				errors.username = ex.response.data;
				setErrors({ errors });
			}
		}
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleChangeCheck = () => {
		setChecked(!checked);
	};

	return (
		<>
			<div className="form-content-left">
				<img
					className="form-img"
					src={require("../../assets/Frame 65.png")}
					alt="LogoSvg"
				/>
			</div>
			<div className="form-content-right">
				<img
					className="pattern"
					src={require("../../assets/pattern.png")}
					alt="pattern"
				/>
				<form className="form" onSubmit={handleSubmit} noValidate>
					<section className="copy">
						<div className="form-inputs">
							<label htmlFor="username" className="form-label">
								Username
							</label>
							<input
								className="form-input"
								type="text"
								name="username"
								id="username"
								placeholder="Enter your username"
								value={values.username}
								onChange={handleChange}
							/>
							{errors.username && <p>{errors.username}</p>}
						</div>
						<div className="form-inputs password">
							<label htmlFor="password" className="form-label">
								Password
							</label>
							<input
								className="form-input"
								type={isPasswordShown ? "text" : "password"}
								name="password"
								id="password"
								placeholder="password"
								value={values.password}
								onChange={handleChange}
							/>
							<div
								className={
									values.password === ""
										? "show-container"
										: "show-container show"
								}
								onClick={() => setIsPasswordShown(!isPasswordShown)}
							>
								{isPasswordShown ? (
									<span className="text">Hide</span>
								) : (
									<span className="text">Show</span>
								)}
								<img
									className="first-hide"
									src={require("../../assets/Frame.png")}
								/>
							</div>
							{errors.password && <p>{errors.password}</p>}
						</div>
						<button className="form-input-btn" type="submit">
							Sign up
						</button>
						<div className="form-input-forget">
							<a href="#" className="forget">
								Forgot your password?
							</a>
							<label className="checkbox-container">
								<input
									type="checkbox"
									checked={checked}
									onChange={handleChangeCheck}
								/>
								Keep signed in?
							</label>
						</div>
						<div className="form-input-login">
							<p>
								Don't have an account? <Link to="/register">Register here</Link>
							</p>
						</div>
						<hr className="style-hr"></hr>
						<button className="btn-google btn-btn" type="submit">
							<img src={require("../../assets/frameGoogle.png")} />
							Continue with google
						</button>
						<button className="btn-facebook btn-btn" type="submit">
							<img src={require("../../assets/vector.png")} />
							Continue with facebook
						</button>
					</section>
				</form>
			</div>
		</>
	);
};

export default FormLogin;

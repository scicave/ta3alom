import React, { useState } from "react";
import Joi, { errors } from "joi-browser";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";

// BackEnd Services
import http from "../../services/httpService";
import { apiUrl } from "../../config/config.json";
import * as userService from "../../services/userService";

const FormRegister = () => {
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		password2: "",
	});
	const [errors, setErrors] = useState({});
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [isPasswordConfirmShown, setIsPasswordConfirmShown] = useState(false);

	const schema = {
		username: Joi.string()
			.alphanum()
			.min(3)
			.max(30)
			.required()
			.label("Username"),
		email: Joi.string().required().email().label("Email"),
		password: Joi.string().required().min(8).label("Password"),
		password2: Joi.string()
			.required()
			.valid(Joi.ref("password"))
			.options({ language: { any: { allowOnly: "must match password" } } })
			.label("Confirm Password"),
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

		setErrors(validate());
		if (errors) return;

		//calling backend
		try {
			const history = useHistory();
			const response = await userService.register(values);
			localStorage.setItem("token", response.headers["x-auth-token"]);
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

	return (
		<>
			<ToastContainer />
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
						<div className="form-inputs">
							<label htmlFor="email" className="form-label">
								Email
							</label>
							<input
								className="form-input"
								type="email"
								name="email"
								id="email"
								placeholder="Enter your email"
								value={values.email}
								onChange={handleChange}
							/>
							{errors.email && <p>{errors.email}</p>}
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
						<div className="form-inputs password">
							<label htmlFor="password2" className="form-label">
								Confirm Password
							</label>
							<input
								className="form-input"
								type={isPasswordConfirmShown ? "text" : "password"}
								name="password2"
								id="password2"
								placeholder="password"
								value={values.password2}
								onChange={handleChange}
							/>
							<div
								className={
									values.password2 === ""
										? "show-container"
										: "show-container show"
								}
								onClick={() =>
									setIsPasswordConfirmShown(!isPasswordConfirmShown)
								}
							>
								{isPasswordConfirmShown ? (
									<span className="text">Hide</span>
								) : (
									<span className="text">Show</span>
								)}
								<img
									className="first-hide"
									src={require("../../assets/frame.png")}
								/>
							</div>
							{errors.password2 && <p>{errors.password2}</p>}
						</div>
						<button className="form-input-btn" type="submit">
							Sign up
						</button>
						<div className="form-input-login">
							<p>
								Already have an account? <Link to="/login">Login here</Link>
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

export default FormRegister;

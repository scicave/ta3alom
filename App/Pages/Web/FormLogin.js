import React, { useState } from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import FormInput from "../../Component/Web/FormInput";
import { Feather } from "@expo/vector-icons";

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
		<div className="form-container">
			<div className="form-content-left">
				<img
					className="form-img"
					src={require("../../assets/LogoSvg.png")}
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
							<FormInput
								className="form-input"
								width="100%"
								radius="4px"
								border="none"
								bgColor="#e2e8f0"
								foSize="0.875rem"
								color="#000"
								type="text"
								name="username"
								placeholder="Enter your username"
								values={values}
								onChange={handleChange}
								errors={errors}
							/>
						</div>
						<div className="form-inputs password">
							<FormInput
								className="form-input"
								width="100%"
								radius="4px"
								border="none"
								bgColor="#e2e8f0"
								foSize="0.875rem"
								color="#000"
								type={isPasswordShown ? "text" : "password"}
								name="password"
								placeholder="Enter password"
								values={values}
								onChange={handleChange}
								errors={errors}
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
								<span className="first-hide">
									{!isPasswordShown ? (
										<Feather name="eye" size={24} color="#718096" />
									) : (
										<Feather name="eye-off" size={24} color="#718096" />
									)}
								</span>
							</div>
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
		</div>
	);
};

export default FormLogin;

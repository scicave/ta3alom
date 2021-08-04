import React from "react";
import "./Form.css";
import FormRegister from "../../Component/Web/FormRegister";
import FormLogin from "../../Component/Web/FormLogin";
import { Route, Switch } from "react-router-dom";

const Form = () => {
	return (
		<>
			{/* <a href="/register">Register</a> */}
			<div className="form-container">
				<Switch>
					<FormRegister />
					{/* <Route path="/register" component={FormRegister} /> */}
					{/* <Route path="/login" component={FormLogin} /> */}
				</Switch>
			</div>
		</>
	);
};

export default Form;

import React from "react";
import { Platform, Text, View } from "react-native";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App/Pages/Web/Form.css";
import FormRegister from "./App/Pages/Web/FormRegister";
import FormLogin from "./App/Pages/Web/FormLogin";

export default function App() {
	if (Platform.OS === "web") {
		return (
			<>
				<nav style={{ height: 73 }}>
					<img
						style={{ width: "100%", height: 73 }}
						src={require("./App/assets/Nav.png")}
					/>
				</nav>
				<BrowserRouter>
					<Switch>
						<Route path="/register" component={FormRegister} />
						<Route path="/login" component={FormLogin} />
					</Switch>
				</BrowserRouter>
			</>
		);
	} else {
		return (
			<View>
				<Text>asdjhgasdg</Text>
			</View>
		);
	}
}
{
	/* <BrowserRouter>
				<a href="/register">Register</a>
				<Switch>
					<Route path="/register" component={FormRegister} />
					<Route path="/login" component={FormLogin} />
				</Switch>
				 <FormRegister /> 
			</BrowserRouter> */
}

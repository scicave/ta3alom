import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Form from "./App/Pages/Web/Form";

export default function App() {
	if (Platform.OS === "web") {
		return (
			<BrowserRouter>
				<nav style={{ height: 73 }}>
					<img
						style={{ width: "100%", height: 73 }}
						src={require("./App/assets/Nav.png")}
					/>
				</nav>
				<Form />
			</BrowserRouter>
		);
	} else {
		return (
			<View>
				<Text>asdjhgasdg</Text>
			</View>
		);
	}
}

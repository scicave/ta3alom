import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function App() {
	if (Platform.OS === "web") {
		return (
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
			</View>
		);
	} else {
		return (
			<View>
				<Text>asdjhgasdg</Text>
			</View>
		);
	}
}

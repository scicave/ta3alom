import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/auth";
const apiEndpointRegister = apiUrl + "/users";
const tokenKey = "token";

http.setJwt(getJwt());

export function register(user) {
	http.post(apiEndpointRegister, {
		username: user.username,
		email: user.email,
		password: user.password,
		password2: user.password2,
	});
}

export async function login(username, password) {
	const { data: jwt } = await http.post(apiEndpoint, {
		username,
		password,
	});
	localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt);
}

export function logout() {
	localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}
}

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

export default {
	login,
	loginWithJwt,
	logout,
	getCurrentUser,
	getJwt,
	register,
};

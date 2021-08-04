import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
	return http.post(apiEndpoint, {
		username: user.username,
		email: user.email,
		password: user.password,
		password2: user.password2,
	});
}

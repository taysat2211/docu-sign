import axios from 'axios';
import config from '../config/default.json';
const access_token = localStorage.getItem('access_token');

export const getUserInfo = async () => {
	//console.log(access_token);
	const axiosConfig = {
		headers: {
			authorization: `Bear ${access_token}`
		}
	};
	const response = await axios.get(
		`${config.backendBaseURL}/users/me`,
		axiosConfig
	);
	return response;
};
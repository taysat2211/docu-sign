import axios from 'axios';
import config from '../../config/default.json';

export const Login = async (username, password) => {
    try {
        const response = await axios.post(`${config.backendBaseURL}/auth/login`, { username: username, password: password });
        return response.data;
    } catch (err) {
        // Handle Error Here
        return null;
    }
};

import axios from 'axios';
import config from '../../config/default.json';

export const signup = async (userInfo) => {
    try {
        const response = await axios.post(`${config.backendBaseURL}/auth/register`, userInfo);
        return response.data;
    } catch (err) {
        // Handle Error Here
        return null;
    }
    // const response = await axios.post(`${config.backendBaseURL}/auth/register`, userInfo);
    // return response.data;
};


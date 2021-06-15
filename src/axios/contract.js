import axios from 'axios';
import config from '../config/default.json';

const access_token = localStorage.getItem('access_token');

export const uploadContract = async (contract) => {
    console.log(access_token);
    const axiosConfig = {    
        headers: {    
            'content-type': 'multipart/form-data',
            'authorization': `Bear ${access_token}`
        },
    };
    const response = await axios.post(`${config.backendBaseURL}/google_storage/contracts`, 
        contract, 
        axiosConfig
    );
    return response;
};

export const createStore = async () => {
    const response = await axios.post(`${config.backendBaseURL}/google_storage/stores`, 
    {}, 
    {
        headers: {
            'authorization': `Bear ${access_token}`
        }
    });
    return response;
}





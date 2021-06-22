import axios from 'axios';
import config from '../config/default.json';


const access_token = localStorage.getItem('access_token');

export const uploadContract = async (contract) => {
	//console.log(access_token);
	const axiosConfig = {
		headers: {
			'content-type': 'multipart/form-data',
			authorization: `Bear ${access_token}`
		}
	};
	const response = await axios.post(`${config.backendBaseURL}/google_storage/contracts`, contract, axiosConfig);
	return response;
};

export const createStore = async () => {
	const response = await axios.post(
		`${config.backendBaseURL}/google_storage/stores`,
		{},
		{
			headers: {
				authorization: `Bear ${access_token}`
			}
		}
	);
	return response;
};

export const getContracts = async (filter, options) => {
	console.log(access_token);
	if (!options) options = {
		limit: 10,
		page: 1
	}
	let contracts;
	if (!filter || filter === {}) {
		contracts = await axios.get(`${config.backendBaseURL}/google_storage/contracts?limit=` + options.limit + `&page=` + options.page, {
			headers: {
				authorization: `Bear ${access_token}`
			}
		});
		console.log(contracts);
		return contracts;
	}
	const { status, type } = filter;
	if (status && type) {
		contracts = await axios.get(`${config.backendBaseURL}/google_storage/contracts?status=` + status + `&type=` + type + `&limit=` + options.limit + `&page=` + options.page, {
			headers: {
				authorization: `Bear ${access_token}`
			}
		});
		console.log(contracts);
		return contracts;
	}
	if (status) {
		contracts = await axios.get(`${config.backendBaseURL}/google_storage/contracts?status=` + status + `&limit=` + options.limit + `&page=` + options.page, {
			headers: {
				authorization: `Bear ${access_token}`
			}
		});
		console.log(contracts);
		return contracts;
	}
	contracts = await axios.get(`${config.backendBaseURL}/google_storage/contracts?type=` + type + `&limit=` + options.limit + `&page=` + options.page, {
		headers: {
			authorization: `Bear ${access_token}`
		}
	});
	console.log(contracts);
	return contracts;
};

export const getContract = async (contractId) => {
	const response = await axios.get(
		`${config.backendBaseURL}/google_storage/contracts/single_contract?contractId=${contractId}`,
		{
			headers: {
				authorization: `Bear ${access_token}`
			}
		}
	);
	return response;
};

// export const downloadFile = async (url) => {
// 	const response = axios.get(url,{withCredentials:true});
// }

export const getSingleContract = async (contractId) => {
	//console.log(access_token);
	const axiosConfig = {
		headers: {
			authorization: `Bear ${access_token}`
		}
	};
	const response = await axios.get(
		`${config.backendBaseURL}/google_storage/contracts/single_contract?contractId=` + contractId,
		axiosConfig
	);
	return response;
};

export const signContract = async (contractId) => {
	const axiosConfig = {
		headers: {
			authorization: `Bear ${access_token}`
		}
	};
	const response = await axios.post(
		`${config.backendBaseURL}/signatures/sign`,
		{contractId},
		axiosConfig
	);
	return response;
}

export const sendContract = async (contractId, receiverEmail, mailSubject) => {
	const axiosConfig = {
		headers: {
			authorization: `Bear ${access_token}`
		}
	};
	const response = await axios.post(
		`${config.backendBaseURL}/transactions/sending`,
		{
			contractId,
			email: receiverEmail,
			subject: mailSubject
		},
		axiosConfig
	);
	return response;
}

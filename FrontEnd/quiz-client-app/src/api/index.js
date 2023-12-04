import axios from 'axios';

export const BASE_URL = 'http://localhost:5257/';

export const ENDPOINTS = {
	participant: 'Participant',
	question: 'Question',
	getAnswers: 'Question/GetAnswers',
};

export const createAPIEndpoints = (endpoint) => {
	let url = BASE_URL + 'api/' + endpoint + '/';
	return {
		get: () => axios.get(url),
		getById: (id) => axios.get(url + id),
		post: (newRecord) => axios.post(url, newRecord),
		put: (id, newRecord) => axios.put(url + id, newRecord),
		delete: (id) => axios.delete(url + id),
	};
};

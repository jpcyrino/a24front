import axios from 'axios';
import { hostName, timeout } from '../utils/axios-config';

export default function useStudentAPI(){

	async function getAssignments(access_key){
		const url = `/assignments`;
		return axios({
			method: 'get',
			url: url,
			headers: {
				'Authorization' : `Bearer ${access_key}`
			},
			baseURL: hostName,
			timeout: timeout,
			responseType: 'json'
		});
	}

	async function getFullfillments(access_key, userId){
		const url = `/fullfillments/user/${userId}`;
		return axios({
			method: 'get',
			url: url,
			headers: {
				'Authorization' : `Bearer ${access_key}`
			},
			baseURL: hostName,
			timeout: timeout,
			responseType: 'json'
		});
	}

	async function getReviews(access_key, fullfillment_id){
		const url = `/reviews/fullfillment/${fullfillment_id}`;
		return axios({
			method: 'get',
			url: url,
			headers: {
				'Authorization' : `Bearer ${access_key}`
			},
			baseURL: hostName,
			timeout: timeout,
			responseType: 'json'
		});
	}

	async function postAnswer(access_key, data){
		const url = `/fullfillments`;
		return axios({
			method: 'post',
			url: url,
			data: data,
			headers: {
				'Content-type': 'application/json',
				'Authorization' : `Bearer ${access_key}`
			},
			baseURL: hostName,
			timeout: timeout,
			responseType: 'json'
		});
	}

	return {
		getAssignments,
		getFullfillments,
		getReviews,
		postAnswer
	}

}
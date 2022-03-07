import axios from 'axios';
import { hostName, timeout } from '../utils/axios-config';

export default function useTutorAPI(){

	async function getReviews(access_key, userId){
		const url=`/reviews/reviewer/${userId}`;
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

	async function getAssignment(access_key, id){
		const url = `/assignments/${id}`;
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

	async function getFullfillment(access_key, id){
		const url = `/fullfillments/${id}`;
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

	async function putReview(access_key, id, data){
		const url = `/reviews/${id}`;
		return axios({
			method: 'put',
			url: url,
			data: data,
			headers: {
				'Content-type' : 'application/json',
				'Authorization' : `Bearer ${access_key}`
			},
			baseURL: hostName,
			timeout: timeout,
			responseType: 'json'
		});
	}

	async function putReviewSend(access_key, id){
		const url = `/reviews/send/${id}`;
		return axios({
			method: 'put',
			url: url,
			headers: {
				'Content-type' : 'application/json',
				'Authorization' : `Bearer ${access_key}`
			},
			baseURL: hostName,
			timeout: timeout,
			responseType: 'json'
		});
	}

	async function postAssignment(access_key, data){
		const url = `/assignments`;
		return axios({
			method: 'post',
			url: url,
			data: data,
			headers: {
				'Content-type' : 'application/json',
				'Authorization' : `Bearer ${access_key}`
			},
			baseURL: hostName,
			timeout: timeout,
			responseType: 'json'
		});
	}

	async function activateAssignment(access_key, id){
		const url = `/assignments/${id}/activate`;
		return axios({
			method: 'put',
			url: url,
			headers: {
				'Content-type' : 'application/json',
				'Authorization' : `Bearer ${access_key}`
			},
			baseURL: hostName,
			timeout: timeout,
			responseType: 'json'
		});
	}

	async function postUser(access_key, data){
		const url = `/users`;
		return axios({
			method: 'post',
			url: url,
			data: data,
			headers: {
				'Content-type' : 'application/json',
				'Authorization' : `Bearer ${access_key}`
			},
			baseURL: hostName,
			timeout: timeout,
			responseType: 'json'
		});
	}



	return{
		getReviews,
		getAssignment,
		getFullfillment,
		postAssignment,
		activateAssignment,
		putReview,
		putReviewSend,
		postUser
		}
	
}
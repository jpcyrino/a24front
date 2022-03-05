import axios from 'axios';
import { hostName, timeout } from '../utils/axios-config';

export default function useLoginAPI(){

	async function getUserFromKey(key){
		const url = `/logon/${key}`;
		return axios({
			method: 'get',
			url: url,
			baseURL: hostName,
			timeout: timeout,
			responseType: 'json'
		});
	}

	async function getKeyFromReg(reg){
		const url = `/activate/${reg}`;
		return axios({
			method: 'get',
			url: url,
			baseURL: hostName,
			timeout: timeout,
			responseType: 'json'
		});
	}

	return {
		getUserFromKey,
		getKeyFromReg
	}


}
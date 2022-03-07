import useLoginAPI from '../api/login-api';

export default function useLogin(){
	const { getUserFromKey, getKeyFromReg } = useLoginAPI();

	async function enterWithKey(key, setUser, setLoading, setError){
		try {
			setLoading(true);
			const response = await getUserFromKey(key);
			setUser(response && response.data);
			localStorage.setItem("user", JSON.stringify(response.data));
			setError(!response && "Chave não encontrada!");			
		} catch(error){
			console.error(error);
			setError("Ocorreu um erro!");
		}	
		setLoading(false);
	}

	async function enterWithReg(reg, setShowKey, setLoading, setError){
		try {
			setLoading(true);
			const response = await getKeyFromReg(reg);
			setError(!response.data && "Chave já divulgada, contate o professor!");
			setShowKey(response?.data);
		} catch(error){
			console.error(error);
			setError("Você não está autorizado!")
		}
		setLoading(false);
	}

	return {
		enterWithReg,
		enterWithKey
	}
}
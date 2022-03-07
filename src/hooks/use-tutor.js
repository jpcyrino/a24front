import useTutorAPI from '../api/tutor-api';


export default function useTutor(){
	const { getReviews, getAssignment, getFullfillment, activateAssignment,
		putReview, putReviewSend, postAssignment, postUser } = useTutorAPI();

	async function loadFullfillments(key, userId, setFullfillments, setLoading, setError){
		try{
			setLoading(true);
			const response = await getReviews(key, userId);
			const fullfillments = await Promise.all(response.data.map(async (f) => {
				const response_f = await getFullfillment(key, f.fullfillment);
				const fullfillment = response_f.data;
				const response_a = await getAssignment(key, fullfillment.assignment);
				const assignment = response_a.data;
				return {...f, assignment, fullfillment };
			}));
			setFullfillments(fullfillments);
		} catch(error){
			console.error(error);
			setError("Ocorreu um erro");
		}
		setLoading(false);
	}

	async function sendReview(key, id, content, grade, setLoading, setError, setUpdated){
		const data = {
			content,
			grade: parseInt(grade)
		}
		try{
			setLoading(true);
			await putReview(key, id, data);
			await putReviewSend(key, id);
			setUpdated(true);
		} catch(error){
			console.error(error);
			setError("Ocorreu um erro");
		}
		setLoading(false);
	}


	async function createAssignment(key, creator, content, expiry, setLoading, setError){
		const data = {
			creator,
			content,
			expiry
		}
		try{
			setLoading(true);
			const response = await postAssignment(key, data);
			const id = response.data.id;
			await activateAssignment(key, id);
		} catch(error){
			console.error(error);
			setError("Ocorreu um erro");
		}
		setLoading(false);
	}

	async function insertUser(key, data){
		try{
			await Promise.all(data.map((d) => postUser(key,d)));
			console.log("done");
		} catch(error){
			console.error(error);
		}
	}

	/*

	async function loadAssignments(key, setAssignments, setLoading, setError){
		try{
			setLoading(true);
			const response = await getAssignments(key);
			setAssignments(response.data);
		} catch(error){
			console.error(error);
			setError("Ocorreu um erro");
		}
		setLoading(false);
	} */

	return {
		loadFullfillments,
		sendReview,
		createAssignment,
		insertUser
	}
}

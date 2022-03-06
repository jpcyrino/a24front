import useStudentAPI from '../api/student-api';


export default function useStudent(){
	const { 
		getAssignments,
		getFullfillments,
		getReviews, 
		postAnswer
	} = useStudentAPI();

	async function loadStudent(user, setData, setLoading, setError){
		try{
			setLoading(true);
			const response = await Promise.all([
				getAssignments(user.access_key),
				getFullfillments(user.access_key, user.id)
				]);
			const assignments = response[0]?.data;
			if(response[1].data.length > 0){
				const fullfillments = await Promise.all(response[1].data.map(async (fullfillment) => {
					const response = await getReviews(user.access_key, fullfillment.id);
					return response.data ?
						{...fullfillment, "review" : response.data } :
						fullfillment;
				}));
				const data = assignments.map((assignment) => {
					const fullfillment = fullfillments.find((f) => f.assignment === assignment.id);
					return fullfillment ? {...assignment, fullfillment} : assignment;
				});
				setData(data);
			} else {
				setData(assignments);
			}
		} catch(error) {
			console.error(error);
			setError(error);
		}
		setLoading(false);
	}

	async function sendAnswer(user, assignment, student, content, setLoading, setError, setFullfillment){
		const data = {
			student,
			assignment,
			content
		};
		try{
			setLoading(true);
			const response = await postAnswer(user.access_key, data);
			setFullfillment({...data, id: response.id});
		} catch(error){
			console.error(error);
			setError("Ocorreu um erro!");
		}
		setLoading(false);
	}

	return {
		loadStudent,
		sendAnswer
	}

}
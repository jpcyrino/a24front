import { useState, useContext, createContext, useEffect } from 'react';
import { UserContext } from '../screens/entry-point';
import LogoutButton from '../components/logout-button';
import { 
	Avatar,
	Box,
	Button,
	Container, 
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	LinearProgress,
	List, 
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	TextField,
	Typography
	 } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import moment from 'moment';
import useStudent from '../hooks/use-student';

const StudentContext = createContext();

export default function StudentScreen(){
	const { loadStudent } = useStudent()
	const { user }  = useContext(UserContext);
	const [ assignment, setAssignment ] = useState(null);
	const [ data, setData ] = useState(null)
	const [ loading, setLoading ] = useState(false);
	const [ error, setError] = useState(null);
	const [ updated, setUpdated ] = useState(false);

	useEffect( () => {
		if((data==null) || updated)loadStudent(user, setData, setLoading, setError);
	}, [user, setData, setLoading, setError, loadStudent])

	const studentContextValues = {
		user, 
		assignment, 
		setAssignment, 
		data, 
		setData,
		setUpdated
	};

	return (
		<Container>
			<Header data={user}/>
			{ loading 
				? <Box>
					<Typography variant="subtitle1">
						Carregando atividades
						</Typography>
					<LinearProgress/>
				  </Box>
				: <StudentContext.Provider value={studentContextValues}>
					{data && <>
						{ assignment 
						? <Fullfillment/>
						: <AssignmentList/>
						}
					</>}
				</StudentContext.Provider>
			}
		</Container>
		)
}


function Header(props){
	return(
		<Box sx={{margin: '20px 0px 40px 0px'}}>
			<Box sx={{float: 'left'}}>
				<Typography variant="h4" color="primary">
					Ola, {props.data.name}! 
				</Typography>
				</Box>
			<Box sx={{float: 'right'}}>
				<LogoutButton/>
				</Box>
			<Box sx={{clear:'both'}}/>
		</Box>)
}

function Fullfillment(){
	const { assignment, setAssignment } = useContext(StudentContext);
	const [ fullfillment, setFullfillment ] = useState(assignment?.fullfillment ?? null)

	function handleBack(){
		setAssignment(null);
	}

	return(
		<Box>
			<Box sx={{float: 'left'}}>
				<Typography variant="h6">
					Atividade com vencimento em {moment(assignment.expiry).format("DD-MM-YY")}
					</Typography>
				</Box>
			<Box sx={{float: 'right'}}>
				<Button
					variant="contained"
					onClick={handleBack}>Voltar</Button>
				</Box>
			<Box sx={{clear: 'both'}}/>
			<Box sx={{marginTop: '20px'}}>
				<Typography variant="body1">
					{assignment.content}
					</Typography>
			</Box>
			{fullfillment ? <AnswerAndFeedback fullfillment={fullfillment}/> : <ComposeAnswer setFullfillment={setFullfillment}/>}
		</Box>)

}

function ComposeAnswer(props){
	const { sendAnswer } = useStudent();
	const setFullfillment = props.setFullfillment;
	const [ answer, setAnswer ] = useState("");
	const [ error, setError ] = useState(null);
	const [ sending, setSending ] = useState(false);
	const { user, assignment, setUpdated } = useContext(StudentContext);

	function handleSubmit(){
		if(!answer){
			setError("Não aceitamos respostas vazias!");
			return false;
		}
		sendAnswer(user, assignment.id, user.id, answer, setSending, setError, setFullfillment);
	}

	function handleChange(e){
		if(error) setError(null);
		setAnswer(e.target.value)
	}

	return(
		<Box sx={{ margin : '20px 5px 0px 5px'}}>
			<TextField
				value={answer}
				onChange={handleChange}
				label="Resposta"
				placeholder="Digite sua resposta aqui..."
				error={error}
				helperText={error || `${answer.length} caracteres`}
				multiline
				rows={10}
				fullWidth
				autoFocus
				/>
			<Box sx={{ float: 'right', margin: '5px'}}>
				<Button
					onClick={handleSubmit}
					color="primary"
					disabled={sending}>
					{sending ? "Enviando..." : "Enviar"}</Button>
			</Box>
		</Box>
		)
}

function AnswerAndFeedback(props){
	const fullfillment = props.fullfillment;

	return(
		<Box sx={{marginTop: '40px'}}>
			<Typography variant="h6">
				Sua resposta:
				</Typography>
			<Box sx={{margin: '20px 0px 10px 0px'}}>
				<Typography variant="body2" color="textSecondary">
					{fullfillment.content}
				</Typography>
			</Box>
			{fullfillment?.review?.sent && 
			<Box sx={{margin: '20px 0px 10px 0px'}}>
				<Typography variant="h6">
					Avaliação:
					</Typography>
				<Box sx={{margin: '10px'}}>
					<Typography variant="body2" color="primary">
						{fullfillment.review.content}
						</Typography>
					<Typography variant="h6" color="secondary">
						Nota: {fullfillment.review.grade}
						</Typography>
				</Box>
			</Box>}
		</Box>

		)
}

function AssignmentList(){
	const { data } = useContext(StudentContext);
	const assignments = data;
	
	return (
		<Box>
			<Typography variant="h6">
				Suas atividades:
				</Typography>
		<List>
			{assignments.map((assignment) => 
				<AssignmentItem 
					key={assignment.id} 
					assignment={assignment}/>)}
		</List>
		</Box>
		)
}

function AssignmentItem(props){
	const { setAssignment } = useContext(StudentContext)
	const assignment = props.assignment;
	const expired = moment().subtract(1,'day').isAfter(assignment.expiry, "day");
	const done = assignment?.fullfillment ?? false;
	const reviewed = assignment?.fullfillment?.review.sent ?? false;
	
	return(
		<ListItem key={assignment.id}>
			<ListItemButton 
				onClick={() => setAssignment(assignment)}
				disabled={expired && !done}>
				<ListItemIcon>
					{ expired && !done 
						? <AssignmentLateIcon color="secondary"/>
						: reviewed
						? <AssignmentTurnedInIcon color="success"/>
						: <AssignmentIcon color={done ? "success" : "primary"}/>
					}
				</ListItemIcon>
					<ListItemText
						primary={
							expired && !done ? "Esta atividade venceu"
							: reviewed ? `Nota: ${assignment.fullfillment.review.grade}/100 
										Clique para ver a correção.`
							: done ? "Aguardando correção"
							: "Vence em " + moment(assignment.expiry).format("DD-MM-YY")
						}
						secondary={assignment.content.substring(0,80) + "..."}/>
			</ListItemButton>
		</ListItem>)
}

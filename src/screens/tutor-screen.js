import { useState, useEffect,
	useContext, createContext } from 'react';
import { UserContext } from './entry-point';
import useTutor from '../hooks/use-tutor';
import LogoutButton from '../components/logout-button';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';

import {
	Box,
	Button,
	Container,
	Divider,
	Grid,
	LinearProgress,
	List,
	ListItem,
	Tab,
	Tabs,
	TextField,
	Typography
} from '@mui/material';

const TutorContext = createContext();

export default function TutorScreen(){
	const { loadFullfillments } = useTutor();
	const { user } = useContext(UserContext);
	const [ fullfillments, setFullfillments ] = useState(null);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ updated, setUpdated ] = useState(false);

	useEffect(() => {
		if((fullfillments == null) || updated) {
			loadFullfillments(user.access_key, user.id, setFullfillments, 
				setLoading, setError);
			setUpdated(false);
		}

	}, [loadFullfillments, user, setFullfillments, fullfillments,
	updated, setUpdated, setLoading, setError])

	return(
		<Container>{loading || error
			? <Box>
				<Typography variant="subtitle1">
					{error ? "ocorreu um erro" : "Carregando..."}
					</Typography>
					<LinearProgress/>
				</Box> 
			:<TutorContext.Provider value={{fullfillments, setUpdated, loading}}>
				<Actions/>
			</TutorContext.Provider>}
		</Container>
		);
}

function TabPanel(props){
	return(
		<div hidden={props.value !== props.index}>
			{props.children}
			</div>
	)
}

function Actions(props){
	const { user } = useContext(UserContext);
	const [ value, setValue ] = useState(0);

	function handleChange(e, newValue){
		setValue(newValue);
	}

	return(
		<Box>
			<Box sx={{float: 'left'}}>
				<Tabs
					value={value}
					onChange={handleChange}>
					<Tab label="Avaliar Atividades"/>
					<Tab label="Criar Atividades"/>
					{ (user.role === "admin") && <Tab label="Inserir Usuários"/>}
				</Tabs>
			</Box>
			<Box sx={{float: 'right'}}>
				<Box sx={{ marginRight: '5px'}}>
					<Typography variant="body1" color="secondary">
						{user.name}
						</Typography>
					</Box>
				<LogoutButton/>
				</Box>
			<Box sx={{clear: 'both' }}>
				<TabPanel value={value} index={0}>
					<ReviewFullfillments/>
					</TabPanel>
				<TabPanel value={value} index={1}>
					<CreateAssignment/>
					</TabPanel>
				<TabPanel value={value} index={2}>
					<InsertUsers/>
					</TabPanel>
				</Box>
		</Box>
		);
}


function ReviewFullfillments(){
	const { fullfillments } = useContext(TutorContext);

	return(
		<Box>
			<Typography sx={{margin: '20px 0px 20px 0px'}} variant="h6" color="primary">
				Avaliações para serem corrigidas
				</Typography>
			<List>
				{fullfillments && fullfillments.map((f) => <Review data={f}/>)}
			</List>
		</Box>
	);
}

function Review(props){
	const f = props.data;
	const { sendReview } = useTutor();
	const { user } = useContext(UserContext);
	const { setUpdated } = useContext(TutorContext);
	const [ review, setReview ] = useState(f.content || "");
	const [ grade, setGrade ] = useState(f.grade || "0");
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(null);

	function handleSend(){
		if((grade === "") || !review) return false;
		sendReview(user.access_key, f.id, review, grade, setLoading, setError,setUpdated);
	}

	return(
		<ListItem key={f.id}>
			<Grid container spacing={2}>
				<Grid item sm={12}>
					<Typography variant="body1">
						<b>Enunciado: </b> {f.assignment.content}
						</Typography>
						</Grid>

				<Grid item sm={12}>
					<Typography variant="body1">
						<b>Resposta: </b> {f.fullfillment.content}
						</Typography>
					</Grid>

				<Grid item sm={12}>
					<TextField
						variant="outlined"
						multiline
						fullWidth
						rows={5}
						value={review}
						error={error}
						helperText={error}
						onChange={(e) => setReview(e.target.value)}
						label="Avaliação"
						disabled={f.sent}
						placehoder="Digite a avaliação"/>
						</Grid>
			
				

				<Grid item sm={8}>
					<TextField
						value={grade}
						onChange={(e) => setGrade(e.target.value)}
						type="number"
						inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
						disabled={f.sent}
						label="Nota (até 100)"/>
					</Grid>

				<Grid item sm={4}>
					<Button
						variant="contained"
						fullWidth
						onClick={handleSend}
						disabled={f.sent || loading}>
						{ loading ? "Enviando" : "Enviar"}
						</Button>
					</Grid>
			</Grid>
			<Divider/>
		</ListItem>
	)
}

function CreateAssignment(){
	const { user } = useContext(UserContext);
	const { createAssignment } = useTutor();
	const [ content, setContent ] = useState("");
	const [ expiry, setExpiry ] = useState(moment());
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(null);

	function handleSend(){
		setError(null);
		const actual_expiry = expiry.add(1,'day');
		createAssignment(user.access_key, user.id, content, actual_expiry, setLoading, setError)
		setContent("");
	}

	return(
		<Box>
			<Box>
				<Typography variant="h6" color="primary">
					Criar atividade
					</Typography>
			</Box>
			<Box sx={{margin: '10px 0px 10px 0px'}}>
				<TextField
					value={content}
					multiline
					rows={5}
					label="Conteúdo da Atividade"
					error={error}
					helperText={error}
					onChange={(e) => setContent(e.target.value)}
					disabled={loading}
					fullWidth/>
			</Box>
			<Box sx={{margin: '10px 0px 10px 0px'}}>
				<DatePicker
    				label="Data de entrega"
    				value={expiry}
    				onChange={(newValue) => {
      					setExpiry(newValue);
    				}}
    				renderInput={(params) => <TextField {...params} />}
  					disabled={loading}
  					/>
			</Box>
			<Box sx={{margin: '5px 0px 5px 0px'}}>
				<Button
					variant="contained"
					onClick={handleSend}
					disabled={loading || (!expiry || !content)}>
					{ loading ? "Enviando..." : "Enviar"}
				</Button>
			</Box>
		</Box>
		);
}

function InsertUsers(){
	const { user } = useContext(UserContext);
	const { insertUser } = useTutor();
	const [data, setData] = useState("");
	const [users, setUsers] = useState(null);

	function handleChange(e) {
		setData(e.target.value)
		const array = e.target.value.split("\n");
		setUsers(array.map(i => {
			const m = i.split(',');
			const dict = {
				name: m[0],
				registry: parseInt(m[1]),
				period: parseInt(m[2]),
				role: 'student'
			}
			return dict;
		}));
	}

	function handleSend(){
		console.log(users);
		insertUser(user.key, users);
	}

	return(
		<Box >
			<TextField sx={{margin: '20px 0px 5px 0px'}}
				multiline
				value={data}
				onChange={handleChange}
				rows={30}
				fullWidth
				/>
			<Button onClick={handleSend}>
				Enviar</Button>
		</Box>
		);
}
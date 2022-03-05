import { useState, useContext, createContext } from 'react';
import { Box } from '@mui/material';
import Login from '../components/login';

const UserContext = createContext();

export default function EntryPoint(){
	const [ user, setUser ] = useState(null);

	return(
		<Box sx={{padding: 2}}>
			<UserContext.Provider value={{user,setUser}}>
				<ScreenSelector/>
			</UserContext.Provider>
		</Box>
	)

}

function ScreenSelector(){
	const { user } = useContext(UserContext);
	const role = user?.role;
	if(role === "admin") return <AdminScreen/>;
	if(role === "tutor") return <TutorScreen/>;
	if(role === "student") return <StudentScreen/>;
	return <Login/>;
}

function AdminScreen(){
}

function TutorScreen(){
}

function StudentScreen(){
	const { user } = useContext(UserContext);

	return(<>
		Show!!
		</>)

}

export {
	EntryPoint,
	UserContext
}
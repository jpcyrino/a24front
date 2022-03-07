import { useState, useContext, createContext } from 'react';
import { Box } from '@mui/material';
import Login from '../components/login';
import StudentScreen from './student-screen';
import TutorScreen from './tutor-screen';

const UserContext = createContext();

export default function EntryPoint(){
	const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("user")));

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
	if(role === "admin") return <TutorScreen/>;
	if(role === "tutor") return <TutorScreen/>;
	if(role === "student") return <StudentScreen/>;
	return <Login/>;
}


export {
	EntryPoint,
	UserContext
}
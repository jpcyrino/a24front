import { UserContext } from '../screens/entry-point';
import useStats from '../hooks/use-stats';
import { useContext } from 'react';
import { Button } from '@mui/material';

export default function LogoutButton(){
	const { setUser } = useContext(UserContext);
	const { addToClicks } = useStats();

	function handleLogout(){
		addToClicks('LogoutButton')
		localStorage.setItem("user", null);
		setUser(null);
	}

	return (
		<Button 
			onClick={handleLogout}
			variant="contained"
			color="warning">
			Sair</Button>
		)
}
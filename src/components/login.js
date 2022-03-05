import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import { UserContext } from '../screens/entry-point';
import useLogin from '../hooks/use-login';

export default function Login(){
	const { setUser } = useContext(UserContext);
	const [ firstAccess, setFirstAccess ] = useState(false);
	const [ key, setKey ] = useState("");
	const [ keyError, setKeyError ] = useState(null);
	const [ reg, setReg ] = useState("");
	const [ regError, setRegError ] = useState(null);
	const [ loading, setLoading ] = useState(false)
	const [ showKey, setShowKey ] = useState(null)
	const { enterWithReg, enterWithKey } = useLogin();

	function fieldIsEmpty(field, setError){
		if(field) return false;
		setError("O campo não pode ficar vazio")
		return true;
	}

	function handleFirstAccess(){
		setKeyError(null);
		setRegError(null);
		setKey("");
		setReg("");
		setFirstAccess(!firstAccess);
	}

	function handleEnterWithKey(){
		setKeyError(null);
		if(fieldIsEmpty(key,setKeyError)) return;
		enterWithKey(key,setUser,setLoading,setKeyError);
	}

	function handleEnterWithReg(){
		setRegError(null);
		if(fieldIsEmpty(reg,setRegError)) return;
		enterWithReg(reg,setShowKey,setLoading,setRegError);
	}

	return(
		<Box sx={{marginTop:2}}>
			<Typography variant="body1" gutterBottom>
				Insira sua chave de acesso para acessar o sistema. Caso ainda não tenha uma, 
				clique em <b>PRIMEIRO ACESSO</b>
				</Typography>
			<Grid container spacing={2}>
				<Grid item sm={12} md={6}>
					<TextField
						variant="outlined"
						label="Chave de Acesso"
						value={key}
						onChange={(e) => setKey(e.target.value)}
						placeholder="Digite sua chave de acesso"
						error={keyError}
						helperText={keyError}
						size="small"
						disabled={firstAccess}
						autoFocus
						fullWidth/>
				</Grid>

				<Grid item sm={12} md={6}>
					<Button 
						variant="contained" 
						onClick={handleEnterWithKey}
						disabled={firstAccess || loading}>
						{loading ? "carregando..." : "Entrar"}
						</Button>
					&nbsp;
					<Button 
						onClick={handleFirstAccess}>
						{firstAccess ? "Voltar" : "Primeiro Acesso" }</Button>
				</Grid>

				{firstAccess &&<>
				<Grid item sm={12}>
					<Typography variant="body1">
						Insira seu número de matrícula (9 dígitos)
						</Typography>
				</Grid>

				<Grid item sm={12} md={6}>

					<TextField
						variant="outlined"
						value={reg}
						onChange={(e) => setReg(e.target.value)}
						label="Matrícula"
						placeholder="Digite seu número de matrícula"
						size="small"
						error={regError}
						helperText={regError}
						autoFocus
						fullWidth/>
					
				</Grid>

				<Grid item sm={12} md={6}>
					<Button 
						onClick={handleEnterWithReg}
						variant="contained"
						disabled={loading}>
						{loading ? "carregando..." : "Obter chave"}
						</Button>
				</Grid>
				</>}

				{showKey && <>
					<Grid item sm={12}>
						<Typography variant="body1" color="primary">
							Sua chave de acesso se encontra abaixo. Guarde-a e não
							divulgue para ninguém. Caso você se esqueça dela ou a 
							perca, consulte o professor. 
							</Typography>
							<br/>
						<Typography variant="h5">
							{showKey?.access_key}
							</Typography>

					</Grid>

				</>}
			
			</Grid>
		</Box>
		
	)
}


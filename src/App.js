import { Box, Divider, Typography, Container } from '@mui/material';
import EntryPoint from './screens/entry-point';

function Header(){
  return(
    <Box sx={{ marginBottom: 2}}> 
        <Typography variant="h2" >LETA24 - Sintaxe da Língua Portuguesa</Typography>
        <Typography variant="h6" gutterBottom>
        Página de atividades para a disciplina de sintaxe do português da UFBA 
        ministrada pelo professor <b>João Paulo Lazzarini Cyrino</b></Typography>
    </Box>
  );

}

function App() {
  return (
    <div>
      <Container fixed>
        <Header/> 
        <Divider/>
        <EntryPoint/>
      </Container>
    </div>
  );
}

export default App;
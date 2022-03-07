import { Box, Divider, Typography, Container } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import EntryPoint from './screens/entry-point';
import moment from 'moment';
import 'moment/locale/pt-br';

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

moment.locale("ptBR")

function App() {
  return (
    <div>
      <LocalizationProvider dateAdapter={DateAdapter} locale="ptBR">
        <Container fixed>
          <Header/> 
          <Divider/>
          <EntryPoint/>
        </Container>
      </LocalizationProvider>
    </div>
  );
}

export default App;
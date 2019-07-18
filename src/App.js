import React from 'react';
import {Container} from '@material-ui/core'
import CreatePhonebankMenu from './components/phonebank/CreatePhonebankMenu.js'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import Navigation from './components/navbar/Navigation'


const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[50],
      main: purple[300],
      dark: purple[900]
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Navigation></Navigation>
      <Container>
        <CreatePhonebankMenu></CreatePhonebankMenu>
      </Container>
    </MuiThemeProvider>
  );
}

export default App;

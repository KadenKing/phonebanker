import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Layout from './components/layout/Layout'
import { deepPurple, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
  },
  error: {
    primary: red
  }
});

function App(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <Layout />
    </MuiThemeProvider>
  );
}

export default App;

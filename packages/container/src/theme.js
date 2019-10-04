import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import lightBlue from '@material-ui/core/colors/lightBlue';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: green[300],
      main: green[500],
      dark: green[700],
      contrastText: '#fff',
    },
    secondary: {
      light: lightBlue[200],
      main: lightBlue[400],
      dark: lightBlue[600],
      contrastText: '#fff',
    },
  },
});

export default theme;

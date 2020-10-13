import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';

//Theme settings
const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#197C4F',
      },
      secondary: {
        main: '#197C4F',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Mitr"',
        '"Segoe UI"',
        'Roboto',
      ].join(','),
    },
});

//-------------------------------------- Styles Part ----------------------------
const GreenTypography = withStyles({
  root: {
    fontSize: 90,
    color: "#197C4F",
  }
})(Typography);

const GreenDesc = withStyles({
  root: {
    color: "#197C4F",
  }
})(Typography);

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(1),
      },
      input: {
        display: 'none',
    },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  login: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//-------------------------------------- End Styles Part ------------------------

type User = {
  username : string
  password : string
}

export const Register : React.FC = () => {
  const classes = useStyles();
  const { register, handleSubmit, setValue, errors } = useForm<User>();

  const onSubmit = async ( user : User ) => {
    const response = await axios.post('http://localhost:3000/auth/login', user )
  }

  return (
    <Container component="main" maxWidth="xs">
      <ThemeProvider theme={theme}>
        <CssBaseline /><div className={classes.paper}>     
          <GreenTypography variant='h1' align="center" color ="primary">
            KU ACTY
          </GreenTypography>
          <br></br>
          <GreenDesc variant="h6" align="center" color="primary">
            ลงทะเบียนเป็นผู้จัดกิจกรรม
          </GreenDesc>
          <br></br>

        </div>
          <form className={classes.login} noValidate>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  type = "string"
                  inputRef = {register({ required : true })}
                  //autoComplete="username"
                  autoFocus
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  inputRef = { register({ required : true }) }
                  id="password"
                  //*autoComplete="current-password" 
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  inputRef = { register({ required : true }) }
                  id="password"
                  //*autoComplete="current-password" 
                />
              </Grid>
              
              <Grid item xs={12}>
                
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    href="registercont"
                  >
                    ดำเนินการต่อ
                  </Button>
                  
              </Grid>
            </Grid>
          </form>

      </ThemeProvider>
    </Container>
  );
}
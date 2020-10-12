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
const BlueTypography = withStyles({
  root: {
    fontSize: 90,
    color: "#0369ad",
  }
})(Typography);

const BlueDesc = withStyles({
  root: {
    color: "#0369ad",
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
export function UploadButtons() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <input
          accept="images/*"
          className={classes.input}
          id="contained-button-file"
          style={{ display: "none" }}
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button 
          variant="outlined" 
          color="primary" 
          component="span" 
          fullWidth>
            Upload File
          </Button>
        </label>
      </div>
    );
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
        <BlueTypography variant='h1' align="center">
          KU ACTY
        </BlueTypography>
        <br></br>
        <BlueDesc variant="h6" align="center">
          ลงทะเบียนเป็นผู้จัดกิจกรรม
        </BlueDesc>
        <br></br>

        </div>
          <form className={classes.login} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="orgname"
              label="Organizer Name"
              name="orgname"
              type = "string"
              inputRef = {register({ required : true })}
              //autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-Mail"
              name="orgname"
              type = "string"
              inputRef = {register({ required : true })}
              //autoComplete="username"
              autoFocus
            />
            
            <UploadButtons />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              สมัครสมาชิก
            </Button>
          </form>

          <Box mt={8}>
            <Link href="https://github.com/NutyHw/KU-Acty/tree/main/frontend" target="_blank">
            <Typography variant="body2" color="textPrimary" align="center">
              Team KU ACTY
            </Typography>
            </Link>
          </Box>
      </ThemeProvider>
    </Container>
  );
}

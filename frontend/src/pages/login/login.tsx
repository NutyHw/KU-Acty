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
const GreenTypography = withStyles({
  root: {
    color: "#217318",
  }
})(Typography);

const GreenDesc = withStyles({
  root: {
    color: "#217318",
  }
})(Typography);

const useStyles = makeStyles((theme) => ({
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

export const Login : React.FC = () => {
  const classes = useStyles();
  const { register, handleSubmit, setValue, errors } = useForm<User>();
  
  const onSubmit = async ( user : User ) => {
    const response = await axios.post('http://localhost:3000/auth/login', user )
  }

  return (
    <Container component="main" maxWidth="xs">

      <ThemeProvider theme={theme}>
        <CssBaseline /><div className={classes.paper}>     
        <GreenTypography variant='h1' align="center">
          KU ACTY
        </GreenTypography>
        <GreenDesc variant="h6" align="center">
          เว็บไซต์สำหรับตรวจสอบและค้นหากิจกรรม<br></br>ภายในมหาวิทยาลัยเกษตรศาสตร์
        </GreenDesc>

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
              name="password"
              label="Password"
              type="password"
              inputRef = { register({ required : true }) }
              id="password"
              //*autoComplete="current-password" 
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              เข้าสู่ระบบ
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ลืมรหัสผ่าน?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"ต้องการเป็นผู้จัดิจกรรม?"}
                </Link>
              </Grid>
            </Grid>
          </form>

          <Box mt={8}>
            <Typography variant="body2" color="textPrimary" align="center">
              Team KU ACTY
            </Typography>
          //</Box>
      </ThemeProvider>
    </Container>
  );
}
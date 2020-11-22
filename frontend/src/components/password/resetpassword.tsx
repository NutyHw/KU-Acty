import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { api, setAuthToken } from '../../api/jsonPlaceholder.instance';
import { ChangePasswordSchema } from './validator';
import { useHistory } from 'react-router-dom';

import { theme } from './../theme/theme';

//-------------------------------------- Styles Part ----------------------------
const GreenDesc = withStyles({
  root: {
    color: "#197C4F",
  }
})(Typography);

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(0),
      },
      input: {
        display: 'none',
    },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    position: 'relative'
  },
  menu: {
    flexGrow: 0,
    position: 'relative'
  },
  login: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(1.25, 0, 0),
  },
}));

//-------------------------------------- End Styles Part ------------------------

type ChangePassword = {
  oldPassword : string
  newPassword : string
  confirmNewPassword : string
}

export const ResetPassword : React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const { register, handleSubmit, setValue, errors } = useForm<ChangePassword>();
  
    const onSubmit = async ( changePassword : ChangePassword ) => {
      await ChangePasswordSchema.validate(changePassword);
      const token = localStorage.getItem('token');
      setAuthToken(token);
      api.post('/auth/change-password',changePassword)
      .then( res => {
        alert('change password success');
        history.push('/org/home')
      } )
      .catch( err => {
        alert(err)
      } )
    }

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h4">KU ACTY</Typography>
          <Box m={1} />
          <Typography align="left" variant="body1" className={classes.title}>
            ระบบตรวจสอบและค้นหากิจกรรม มหาวิทยาลัยเกษตรศาสตร์
          </Typography>
        </Toolbar>
      </AppBar> 
    </div>
    <Container component="main" maxWidth="xs">
    

    <form className={classes.login} noValidate>
        <Typography variant="h6" align="center">
            รีเซ็ทรหัสผ่าน
            
        </Typography>
        <Grid container spacing={1}>
        <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="new-password"
                  name="new-password"
                  label="รหัสผ่านใหม่"
                  type="password"
                  inputRef = { register({ required : true }) }
                />
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="new-password"
                  name="new-password"
                  label="ยืนยันรหัสผ่านใหม่"
                  type="password"
                  inputRef = { register({ required : true }) }
                />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={7}></Grid>
              <Grid item xs={4}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    href="/login"
                    >
                    ตั้งรหัสผ่านใหม่
                </Button>
            </Grid>
            
            </Grid>
            </form>
            </Container>
    </ThemeProvider>  
  );
}

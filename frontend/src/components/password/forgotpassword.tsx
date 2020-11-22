import React from 'react';
import axios from 'axios';
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

import { theme } from './../theme/theme';
import { api } from '../../api/jsonPlaceholder.instance';

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

type User = {
  username : string
}

export const ForgotPassword : React.FC = () => {
    const classes = useStyles();
    const { register, handleSubmit, setValue, errors } = useForm<User>();
  
    const onSubmit = async ( user : User ) => {
      console.log(user)
      api.post('/auth/reset-password', user )
      .catch( err => {
        alert(err);
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
    

    <form className={classes.login} noValidate onSubmit={ handleSubmit(onSubmit) }>
        <Typography variant="h6" align="center">
            ลืมรหัสผ่าน
            
        </Typography>
        <Grid container spacing={1}>
            
            <Grid item xs={9}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              type = "string"
              color = "primary"
              inputRef = {register({ required : true })}
              autoFocus 
            />
            </Grid>
            <Grid item xs={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ยืนยัน
            </Button>
            </Grid>
            
            <Grid item xs={12}>
            <Typography variant="caption">
                *ระบบจะทำการส่งลิ้งค์สำหรับตั้งรหัสผ่านใหม่ไปยังอีเมลที่ได้ลงทะเบียนไว้
            </Typography>
            </Grid> 
            
            
            </Grid>
            </form>
            </Container>
    </ThemeProvider>  
  );
}

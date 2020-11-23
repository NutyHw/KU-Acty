import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { OrgHeader } from '../header/org.header';
import { theme } from './../theme/theme';
import { api, setAuthToken } from '../../api/jsonPlaceholder.instance';
import { ChangePasswordSchema } from './validator';

//-------------------------------------- Styles Part ----------------------------


const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(0),
      },
      input: {
        display: 'none',
    },
  paper: {
    marginTop: theme.spacing(16),
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
  midpage: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    
  },
  login: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    width: '100%'
  },
}));

//-------------------------------------- End Styles Part ------------------------

type ChangePassword = {
  oldPassword : string
  newPassword : string
  confirmNewPassword : string
}

export const ChangePassword : React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit, setValue, errors } = useForm<ChangePassword>();

  const onSubmit = async ( changePassword : ChangePassword ) => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const res = await api.post('/auth/change-password',changePassword);
    alert("เปลี่ยนรหัสผ่านสำเร็จ");
    history.push({
      pathname : '/org/selfprofile'
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <OrgHeader/>

    <Container className={classes.paper} component="main" maxWidth="xs">
    <Typography variant="h6" align="center" color="textPrimary">
            เปลี่ยนรหัสผ่าน
          </Typography>
      <form className={classes.login} noValidate onSubmit={ handleSubmit(onSubmit) }>
            <Grid container spacing={1}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="oldPassword"
                  label="รหัสผ่านเก่า"
                  name="oldPassword"
                  type = "password"
                  inputRef = {register({ required : true })}
                  autoFocus
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
                  id="newPassword"
                  name="newPassword"
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
                  id="newConfirmPassword"
                  name="newConfirmPassword"
                  label="รหัสผ่านใหม่"
                  type="password"
                  inputRef = { register({ required : true }) }
                />
              </Grid>

              <Grid item xs={7}></Grid>
              <Grid item xs={4}>
                
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    เปลี่ยนรหัสผ่าน
                  </Button>
                  
              </Grid>
            </Grid>
          </form>

    </Container>
    </ThemeProvider> 
  );
}

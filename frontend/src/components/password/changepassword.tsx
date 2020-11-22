import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { relative } from 'path';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';

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
  const { register, handleSubmit, setValue, errors } = useForm<ChangePassword>();

  const onSubmit = async ( changePassword : ChangePassword ) => {
    //console.log(changePassword);
    //await ChangePasswordSchema.validate(changePassword);
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const res = await api.post('/auth/change-password',changePassword);
  }

  useEffect( () => {
    console.log('test');
  } , [])
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
          <IconButton color="inherit" href="/#">
              <PersonOutlineOutlinedIcon fontSize="large"/>
          </IconButton>
          
          <IconButton color="inherit" href="/login">
              <ExitToAppOutlinedIcon fontSize="large"/>
          </IconButton>
        </Toolbar>
      </AppBar> 
    </div>
    <AppBar position="static" elevation={0} color="secondary" > 
        <Toolbar variant="dense">
            <ButtonGroup variant="text" color="default" aria-label="text primary button group">
                <Button href="/org/home"><HomeOutlinedIcon/><Box m={0.25} />หน้าหลัก</Button>
                <Button href="/org/createevent"><PostAddOutlinedIcon/><Box m={0.25} />ประกาศกิจกรรม</Button>
                <Button href="/#"><SearchOutlinedIcon/><Box m={0.25} />ค้นหากิจกรรม</Button>
                </ButtonGroup>
        </Toolbar>
      </AppBar>
     

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

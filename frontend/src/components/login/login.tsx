import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';
import { GreenTypography, GreenDesc, useStyles } from './style';
import  { User } from './type'
import { api } from '../../api/jsonPlaceholder.instance';
import { theme } from './../theme/theme';
import { useHistory } from 'react-router-dom';

export const Login : React.FC = () => {
  const classes = useStyles();
  const history = useHistory()

  const { register, handleSubmit } = useForm<User>();

  const onSubmit = async ( user : User ) => {
    try{
      const response = await api.post('/auth/login', user );
      localStorage.setItem('token',response.data.access_token);
      if ( response.data.role === 'organizer' ){
        history.push({
          pathname : '/org/home'
        })
      } else if ( response.data.role === 'nisit' ){
        history.push({
          pathname : '/nisit/home'
        })
      }
    } catch( err ) {
      alert("ชื่อบัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      return;
    }
  }

  return (
    <Container component="main" maxWidth="xs">

      <ThemeProvider theme={theme}>
        <CssBaseline /><div className={classes.paper}>     
        <GreenTypography variant='h1' align="center">
          KU ACTY
        </GreenTypography>
        <GreenDesc variant="h6" align="center">
        ระบบตรวจสอบและค้นหากิจกรรม<br></br>มหาวิทยาลัยเกษตรศาสตร์
        </GreenDesc>

        </div>
          <form className={classes.login} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              type = "string"
              color = "primary"
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
              color = "primary"
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
              <Grid item xs
                alignItems = "flex-start">
                <Link href="/forgotpassword" variant="body2" color="primary">
                  ลืมรหัสผ่าน?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2" color="primary">
                  {"ต้องการเป็นผู้จัดกิจกรรม?"}
                </Link>
              </Grid>
            </Grid>
          </form>

          <Box mt={12}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <GitHubIcon className={classes.icon}/>
              </Grid>
            </Grid>
            <Link href="https://github.com/NutyHw/KU-Acty/" target="_blank">
              <Typography variant="body2" color="textPrimary" align="center">
                Team KU ACTY
              </Typography>
            </Link>
          </Box>

      </ThemeProvider>
    </Container>
  );
}

import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { UserSchema } from './validator';
import { theme, GreenTypography, GreenDesc, useStyles } from './style';
import { User } from './type';
import { useHistory } from 'react-router-dom';
import { api } from '../../api/jsonPlaceholder.instance';

export const Register : React.FC = () => {
  const classes = useStyles();
  let history = useHistory();
  const { register, handleSubmit } = useForm<User>({
    defaultValues : {
      username : '',
      password : '',
      confirmPassword : ''
    }
  })

  const onSubmit = async ( user : User ) => {
    try{
      await UserSchema.validate(user);

      const payload = {
        username : user.username,
        password : user.password
      }
      const res = await api.post('/auth/register', payload );

      history.push({
          pathname : '/registercont/' + String(res.data._id)
      })
      history.go(0);

    } catch( err ) {
      throw new Error(err)
      return;
    }
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
          <form className={classes.login} onSubmit={handleSubmit(onSubmit)}>
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
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  inputRef = { register({ required : true }) }
                  id="confirmPassword"
                />
              </Grid>
              
              <Grid item xs={12}>
                
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
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

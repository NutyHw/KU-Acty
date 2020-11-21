import React from 'react';
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { theme } from '../theme/theme';
import { OrgHeader } from '../header/org.header';
import { api, setAuthToken } from '../../api/jsonPlaceholder.instance';
import { useHistory  } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Organizer } from './type';
import { OrganizerSchema } from './validator';
import {  useStyles } from './style';

export const EditProfile : React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm<Organizer>();
  const { id } = useParams();

  async function onSubmit ( org : Organizer ){
    try {
      org.user = id;
      OrganizerSchema.validate(org)
      const token = localStorage.getItem('token');
      setAuthToken(token);
      await api.put('/organizers/profile', org );
      history.push({
        pathname : '/org/home'
      })
    } catch( err ) {
      throw new Error(err)
      return;
    }
  }
  
  return (
    <Container component="main" maxWidth="xs">
    <ThemeProvider theme={theme}>
      <OrgHeader />
      <div className={classes.midpage}>    
          <Typography variant="h6" align="center" color="textPrimary">
            แก้ไขรายละเอียดองค์กร
          </Typography>  
      <form className={classes.login} noValidate //onSubmit={handleSubmit(onSubmit)} 
      >
      <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="orgname"
                  label="ชื่อชมรมหรือหน่วยงาน"
                  name="organizer_name"
                  type = "string"
                  inputRef = {register({ required : true })}
                  autoComplete="username"
                  autoFocus
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="E-Mail"
                  name="email"
                  type = "string"
                  inputRef = {register({ required : true })}
                  autoFocus
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="location"
                  label="ที่ตั้งในมหาวิทยาลัย"
                  name="location"
                  type = "string"
                  inputRef = {register({ required : true })}
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="contact"
                  label="ช่องทางการติดต่อ"
                  name="contact"
                  type = "string"
                  inputRef = {register({ required : true })}
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="description"
                  label="คำอธิบายชมรมหรือหน่วยงานโดยย่อ"
                  name="description"
                  type = "string"
                  inputRef = {register({ required : true })}
                  autoFocus
                  multiline
                  rows = {3}
                  rowsMax = {4}
                />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={3}>
              <Button
                  href = "/org/selfprofile"
                  fullWidth
                  variant="contained" 
                >
                  ยกเลิก
                </Button>
                </Grid>
                <Grid item xs={3}>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  
                >
                  ยืนยัน
                </Button>
                </Grid>
              </Grid>
              </form>
              </div>
    </ThemeProvider> 
    </Container> 
  );
}

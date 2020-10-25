import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';
import { GreenTypography, GreenDesc, useStyles } from './style';
import { Organizer } from './type';
import { OrganizerSchema } from './validator';
import { ThemeProvider } from '@material-ui/core/styles/';
import { useHistory } from 'react-router-dom';
import { api, setFileUploadHeader } from '../../api/jsonPlaceholder.instance';
import { theme } from './../theme/theme';

export const UploadButtons : React.FC<any> = ( prop ) => {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <input
          accept="application/pdf"
          className={classes.input}
          id="contained-button-file"
          style={{ display: "none" }}
          onChange = { prop.onFileChange }
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button 
          variant="outlined" 
          color="primary" 
          component="span" 
          fullWidth>
            อัพโหลดไฟล์หลักฐานการตั้งชมรม
          </Button>
        </label>
      </div>
    );
}

export const RegisterCont : React.FC = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<Organizer>();
  const [ selectFile, setSelectFile ] = useState(Object);
  let history = useHistory();

  const { id } = useParams();

  const onFileChange = ( event : any ) => {
    setSelectFile(event.target.files[0])
  }

  const upload = async () => {
      try{
          const formData = new FormData()
          if ( selectFile === Object ){
              throw new Error('file is not being uploaded')
              return;
          }
          formData.append('file',selectFile,selectFile.name );
          await api.post('/organizers/upload/' + id,formData, {
              headers : {
                  'Content-Type' : 'multipart/form-data'
              }
          })
      } catch ( err ){
          throw new Error(err)
          return;
      }
  }

  async function onSubmit ( org : Organizer ){
      try {
        org.user = id;
        OrganizerSchema.validate(org)
        await api.post('/organizers/', org );
        await upload()
        history.push('/login');
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
          <form className={classes.login} noValidate onSubmit={handleSubmit(onSubmit)}>
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
                  //autoComplete="username"
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

              <Grid item xs={12}>
              <UploadButtons onFileChange = { onFileChange }/>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  ยืนยันการลงทะเบียน
                </Button>
              </Grid>
            </Grid>
          </form>

      </ThemeProvider>
    </Container>
  );
}
//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
// material ui import
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import { GreenDesc, useStyles, MenuProps } from './style';
import { theme } from './../theme/theme';
import { api, setAuthToken } from '../../api/jsonPlaceholder.instance';
import { OrgHeader } from '../header/org.header';

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
          แนบไฟล์นำเสนอกิจกรรม
        </Button>
      </label>
    </div>
  );
}

export const EditEvent : React.FC = () => {
  const classes = useStyles();
  const history = useHistory()
  const [ eventTypeName, setEventTypeName ] = useState<string[]>([]);
  const [ status, setStatus ] = useState<string[]>([]);
  const [ allType, setAllType ] = useState<any[]>([]);
  const [ mapper, setMapper ] = useState<any>([]);
  const { register, handleSubmit, control } = useForm();

  useEffect( () => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    api.get('/nisits/transcriptRule')
    .then( res => {
      setAllType(res.data)
      const res2 = {}
      for ( const type of res.data ){
        res2[type.event_type_name] = type._id
      }
      setMapper(res2)
    } )
  }, [] )

  const handleChangeMultiple = (event : any) => {
    setEventTypeName(event.target.value as string[]);
  };

  const handleChangeStatus = (event : any) => {
    setStatus(event.target.value as string[]);
  };
  const onSubmit = async ( data : any ) => {
    try{
      const { event_start_date, event_end_date, event_start_time, event_end_time, event_type, status,  ...creatEvent } = data;
      console.log(creatEvent)
      creatEvent.event_start_time = new Date(event_start_date + ' ' + event_start_time).toISOString()
      creatEvent.event_end_time = new Date(event_end_date + ' ' + event_end_time).toISOString()
      creatEvent.event_type = eventTypeName.map( name => mapper[name] )

      const token = localStorage.getItem('token');
      setAuthToken(token);
      await api.put('/events/',creatEvent)
      history.push({
        pathname : '/org/home'
      })
    } catch (err) {
      alert(err)
      return ;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <OrgHeader/>
      <Container component="main" maxWidth="sm">
        <ThemeProvider theme={theme}>
          <CssBaseline /><div className={classes.midpage}>    
          <Typography variant="h6" align="center" color="textPrimary">
            แก้ไขกิจกรรม
          </Typography>  
          </div>
            <form className={classes.login} onSubmit={ handleSubmit(onSubmit) }>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="eventname"
                    label="ชื่อกิจกรรม"
                    name="event_name"
                    type = "string"
                    color = "primary"
                    inputRef = { register({ required : true }) }
                    autoFocus 
                  />
                </Grid>
                
                <Grid item xs={12}>
                <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                  <InputLabel>สถานะกิจกรรม</InputLabel>
                  <Select
                    native
                    onChange={ handleChangeStatus }
                    label="สถานะกิจกรรม"
                    id="status"
                    color="primary"
                    name="status"
                  >
                    <option aria-label="None" value="" />
                    <option value={'prepare'}>เตรียมจัดกิจกรรม</option>
                    <option value={'open'}>เปิดรับสมัคร</option>
                    <option value={'close'}>ปิดรับสมัคร</option>
                    <option value={'cancel'}>ยกเลิกกิจกรรม</option>
                  </Select>
                </FormControl>
                </Grid>

                <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl} >
                  <InputLabel id="eventtype">ประเภทกิจกรรม</InputLabel>
                  <Controller 
                    render = { () => (
                      <Select
                        labelId="eventtype"
                        id="eventtype"
                        multiple
                        value={ eventTypeName }
                        onChange={ handleChangeMultiple }
                        renderValue={(selected) => ( selected as string[] ).join(', ')}
                        MenuProps={MenuProps}
                      >
                        {allType.map((elm) => (
                          <MenuItem key={elm._id} value={elm.event_type_name}>
                            <Checkbox color="primary" checked={eventTypeName.indexOf(elm.event_type_name) > -1}/>
                            <ListItemText primary={elm.event_type_name} />
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                   name = 'event_type'
                   control = { control }
                  />
                </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="hour"
                    label="จำนวนชั่วโมง"
                    name="benefit_hour"
                    inputRef = { register({ required : true }) }
                    type = "integer"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={6}>
                  <Controller
                    as = {
                      <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        id="startdate"
                        label="วันที่เริ่มกิจกรรม"
                        type="date"
                        name="event_start_date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        />
                    }
                    name = 'event_start_date'
                    control = { control }
                  />
                </Grid>

                <Grid item xs={4}>
                  <Controller
                    as = {
                      <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        id="time"
                        label="เวลาเริ่มกิจกรรม"
                        type="time"
                        inputRef = { register({ required : true }) }
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    }
                    name = "event_start_time"
                    control = { control }
                  />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={6}>
                  <Controller
                    as = {
                    <TextField
                      variant="outlined"
                      margin="dense"
                      required
                      fullWidth
                      id="enddate"
                      label="วันที่สิ้นสุดกิจกรรม"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    }
                  name = "event_end_date" 
                  control = { control }
                  />
                </Grid>

                <Grid item xs={4}>
                  <Controller
                    as = {
                    <TextField
                      variant="outlined"
                      margin="dense"
                      required
                      fullWidth
                      id="time"
                      label="เวลาสิ้นสุดกิจกรรม"
                      type="time"
                      inputRef = { register({ required : true }) }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    }
                    name = "event_end_time"
                    control = { control }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="location"
                    label="สถานที่"
                    name="place"
                    type = "string"
                    inputRef = { register({ required : true }) }
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
                    inputRef = { register({ required : true }) }
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="description"
                    label="รายละเอียดกิจกรรม"
                    name="description"
                    type = "string"
                    inputRef = { register({ required : true }) }
                    autoFocus
                    multiline
                    rows = {3}
                    rowsMax = {4}
                  />
                </Grid>
                
                <Grid item xs={5}>
                  <UploadButtons />
                </Grid>
                <Grid item xs={3}></Grid>
                
                <Grid item xs={4}> 
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    
                    className={classes.submit}
                  >
                    แก้ไขกิจกรรม
                  </Button>
                  </Grid>
                  </Grid>
            </form>
            </ThemeProvider>   
      </Container>
      <Box mt={10}></Box>
    </ThemeProvider>   
  );
}

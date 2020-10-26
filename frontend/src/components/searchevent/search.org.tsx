import React, { useEffect, useState } from 'react';
import { OrgHeader } from '../header/org.header';
// material ui import
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GreenDesc, useStyles, MenuProps } from './style';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import { api, setAuthToken } from '../../api/jsonPlaceholder.instance';

import { theme } from './../theme/theme';

const typenames = [
  'กิจกรรมมหาวิทยาลัย',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาคุณธรรม จริยธรรม',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาทักษะการคิดและการเรียนรู้',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคลและการสื่อสาร',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาสุขภาพ',
  'กิจกรรมเพื่อสังคม',
];

export function SearchReslt( props : any ) {
  const classes = useStyles();

  const renderResult = () => {
    return props.searchResult.map( ( el : any ) => {
      return <Box 
              className={classes.actybox}
              boxShadow={5}
              display="flex" 
              p={3} 
              m={3}
              bgcolor="#b9f6ca" >
          <List className={classes.actybox}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={ el.event_name }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    { el.start_date }<br/>
                    { el.place }<br/>
                    { el.event_type.join(',') }<br/>
                  <VisibilityIcon/> { el.view_counts }<br/>
                  <TurnedInIcon/> { el.interest_count } <br/>
                  </Typography>
                  <br/>
                </React.Fragment>
              }
            />
          </ListItem>
          </List>
        </Box>
    } )
  }
    return (<div>
      { renderResult() }
    </div> 
  );
}

export const SearchEventOrg : React.FC = () => {
  const classes = useStyles();
  const [ eventName, setEventName ] = useState('')
  const [ eventType, setEventType ] = useState<string[]>([]);
  const [ startDate, setStartDate ] = useState(null);
  const [ endDate, setEndDate ] = useState(null);
  const [ searchResult, setSearchResult ] = useState<any[]>([]);
  
  const searchOnChange = ( e: any ) => {
    setEventName(e.target.value);
  }

  const startDateOnChange = ( e : any ) => {
    setStartDate(e.target.value);
  }

  const endDateOnChange = ( e : any ) => {
    setEndDate(e.target.value);
  }

  const eventTypeChange = ( e : any, values : any ) => {
    setEventType(values)
  }

  useEffect( () => {
    console.log(searchResult);
    
  }, [ searchResult ])
  const search = async () => {
    const payload = {
      event_name : eventName,
      event_type : eventType,
      event_start_time : startDate,
      event_end_time : endDate
    }
    const token = localStorage.getItem('token');
    setAuthToken(token)
    const res = await api.post('/events/search/', payload)
    setSearchResult(res.data)
  }

  return (
    <ThemeProvider theme={theme}>
      <OrgHeader/>
      <div className={classes.midpage}> 
      <Container component="main" maxWidth="md">
        <ThemeProvider theme={theme}>
          <CssBaseline />   
          <Typography variant="h6" align="center" color="textPrimary">
            ค้นหากิจกรรม
          </Typography>  
          <Grid container spacing={1}>
          <Grid item xs={4}>
          <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  name="key"
                  label="ค้นหาด้วยชื่อกิจกรรม"
                  type="key"
                  id="key"
                  onChange = { searchOnChange }
                />
          </Grid>

          <Grid item xs={2}>
          <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="startdate"
                    label="วันที่เริ่มกิจกรรม"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange = { startDateOnChange }
                    >
                  </TextField>
            </Grid>

            <Grid item xs={2}>
            <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="enddate"
                    label="วันที่กิจกรรมสิ้นสุด"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange = { endDateOnChange }
                    >
              </TextField>
            </Grid>

            <Grid item xs={4}>
            <Autocomplete
              multiple
              id="type"
              options={typenames}
              filterSelectedOptions
              renderInput={(params) => (<TextField {...params} label="เลือกประเภทของกิจกรรม" placeholder="ประเภทของกิจกรรม" />)}
              onChange = { eventTypeChange }
              />
            </Grid>
            </Grid>
            <Grid container spacing={1}>
            <Grid item xs={1}>
            <Button 
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={ search }
                    className={classes.submit}><SearchOutlinedIcon/> ค้นหา </Button>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            </Grid>
            </ThemeProvider>
            <Typography variant="h6" align="center" color="textPrimary">
            ผลการค้นหา
          </Typography>    
      </Container></div>
      <br/>
      <br/>
      <Container fixed>
        <Typography  component="main" style={{ backgroundColor: '#eeeeee', height: '100vh' }}>
        <Grid container direction="column" alignItems="center">
          <SearchReslt searchResult={ searchResult }/>
        </Grid>
      
      </Typography>
      </Container>
      <Box mt={10}></Box>
    </ThemeProvider>   
  );
}

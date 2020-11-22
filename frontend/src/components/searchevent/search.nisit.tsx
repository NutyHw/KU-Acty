import React, { useEffect, useState } from 'react';
import { NisitHeader } from '../header/nisit.header';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useStyles} from './style';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Autocomplete from '@material-ui/lab/Autocomplete';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { api, setAuthToken } from '../../api/jsonPlaceholder.instance';
import Chip from '@material-ui/core/Chip';
import { theme } from './../theme/theme';
import StarIcon from '@material-ui/icons/Star';
import { useHistory  } from 'react-router-dom';


const typenames = [
  'กิจกรรมมหาวิทยาลัย',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาคุณธรรม จริยธรรม',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาทักษะการคิดและการเรียนรู้',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคลและการสื่อสาร',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาสุขภาพ',
  'กิจกรรมเพื่อสังคม',
];

export function SearchReslt( props : any ) {
  const history = useHistory();
  const classes = useStyles();

  const renderResult = () => {
    return props.searchResult.map( ( el : any ) => {
      const startTimeDate = new Date(el.event_start_time);
      const startTime = startTimeDate.getDate() + '/' + startTimeDate.getMonth() + '/' + startTimeDate.getFullYear();
      return <React.Fragment>
      <Box 
      className={classes.actybox}
      boxShadow={10}
      alignItems="center"
      display="flex" 
      p={3} 
      m={3}
      bgcolor="#fafafa">
          <Grid container spacing={1}>
          <Grid item xs={10}>
            <Box>
              <Typography component="span" variant="body2" color="textPrimary">
                <Typography variant="h6" align="left" color="textPrimary">{ el.event_name }</Typography>
                สถานที่จัด : {el.place}<br/>
                เริ่มจัดกิจกรรม : <Chip size="small" label={startTime}/><br/>
                {'______________________________________________________________________________________'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              className={classes.submit}
              onClick={ () => { 
                history.push({
                  pathname: '/nisit/eventdetail/' + el._id
                })
              } }
            >
            <KeyboardArrowRightIcon/>รายละเอียด
            </Button><br/><br/>
            <VisibilityIcon/> { el.view_counts } <StarIcon /> { el.interest_count }
            </Box>
          </Grid>
          <Typography component="span" variant="body2" color="textPrimary">
          {" ประเภท "}{ el.event_type.join(' , ')}</Typography><br/>
          </Grid>
      </Box>
    </React.Fragment>
    } )
  }
    return (<div>
      { renderResult() }
    </div> 
  );
}

export const SearchEvent : React.FC = () => {
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
      <NisitHeader/>
      <div className={classes.midpage}> 
      <Container component="main" maxWidth="md">
        <ThemeProvider theme={theme}>
          <CssBaseline />   
          <Typography variant="h6" align="center" color="textPrimary">
            ค้นหากิจกรรม
          </Typography>  
          <Grid container spacing={1}>
          <Grid item xs={6}>
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

          <Grid item xs={3}>
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

            <Grid item xs={3}>
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

            <Grid item xs={11}>
            <Autocomplete
              multiple
              id="type"
              options={typenames}
              filterSelectedOptions
              renderInput={(params) => (<TextField {...params} label="เลือกประเภทของกิจกรรม" placeholder="ประเภทของกิจกรรม" />)}
              onChange = { eventTypeChange }
              />
            </Grid>
            
            
            <Grid item xs={1}>
            <Button 
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={ search }
                    className={classes.submit}><SearchOutlinedIcon/> ค้นหา </Button>
            </Grid>
            </Grid>
            </ThemeProvider> 
            <Typography variant="h6" align="center" color="textPrimary">
             <br/>
            {"ผลการค้นหา"}
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


import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarIcon from '@material-ui/icons/Star';
import { NisitHeader  } from '../header/nisit.header';
import { useParams } from 'react-router-dom';
import { theme } from './../theme/theme';
import { api, setAuthToken } from '../../api/jsonPlaceholder.instance';

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
    marginTop: theme.spacing(0),
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
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    
  },
  login: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

//-------------------------------------- End Styles Part ------------------------

export const NisitEventDetail : React.FC = () => {
  const classes = useStyles();
  const { id } = useParams();

  const [ event, setEvent ] = useState();

  useEffect( () => {
    const token = localStorage.getItem('token')
    setAuthToken(token);
    api.get('/events/' + id + '/detail')
    .then( res => {
      const eventData = res.data
      const startTime = new Date(eventData.eventDetail.event_start_time)
      const endTime = new Date(eventData.eventDetail.event_end_time)

      eventData.eventDetail.event_start_date = startTime.getDay() + '/' + startTime.getMonth() + '/' + ( startTime.getFullYear() + 543 )
      eventData.eventDetail.event_start_clock = startTime.getHours() + ':' + startTime.getMinutes()

      eventData.eventDetail.event_end_date = endTime.getDay() + '/' + endTime.getMonth() + '/' + ( endTime.getFullYear() + 543 )
      eventData.eventDetail.event_end_clock = endTime.getHours() + ':' + endTime.getMinutes()
      setEvent(eventData);
    } )
  }, [])

  //แก้เป็น interest_count++
  function handleClick() {
    alert('interest count ++');
  }

  return (
      <Container component="main" maxWidth="md">
        <NisitHeader/>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className={classes.midpage}>    
          
            <form className={classes.login} noValidate></form>
            <Grid container>

            <Grid item xs={9}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    ชื่อกิจกรรม : { event ? event.eventDetail.event_name : null }
                  </Typography>
                </Grid>
              
                <Grid item xs={12}>
                <Typography variant="h6">
                  ผู้จัดกิจกรรม : { event ? event.organizerDetail.organizer_name : null }
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                <Typography> 
                  ประเภทกิจกรรม : { event ? event.eventDetail.event_type : null }
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>
                    จำนวนชั่วโมง :  { event ? event.eventDetail.benefit_hour : null }
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                <Typography>
                  สถานที่ : { event ? event.eventDetail.place : null }
                  </Typography>
                </Grid>


                <Grid item xs={6}>
                <Typography>
                  วันที่เริ่มกิจกรรม : { event ? event.eventDetail.event_start_date : null }
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                <Typography>
                  เวลาเริ่มกิจกรรม : { event ? event.eventDetail.event_start_clock : null }
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                <Typography>
                  วันที่สิ้นสุดกิจกรรม : { event ? event.eventDetail.event_end_date : null }
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                <Typography>
                  เวลาสิ้นสุดกิจกรรม : { event ? event.eventDetail.event_end_clock : null }
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                <Typography>
                  ช่องทางการติดต่อ : { event ? event.eventDetail.contact : null }
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                <Typography>
                  รายละเอียดกิจกรรม : { event ? event.eventDetail.description : null }
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={2}>
              <Grid container>
                <Grid item xs>
                  <Button variant="contained" color="primary" onClick={handleClick}>สนใจกิจกรรมนี้</Button><br/><br/>
                  <Typography style={{display: 'flex', alignItems: 'center'}}>
                    <VisibilityIcon />view_count
                  </Typography><br/>
                  <Typography style={{display: 'flex', alignItems: 'center'}}>
                    <StarIcon/>int_count
                  </Typography>
                </Grid>
              </Grid>

            </Grid>

            </Grid>
          </div>
        </ThemeProvider>   
    </Container>
  );
}

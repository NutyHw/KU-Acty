import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { theme } from './../theme/theme';
import { NisitHeader } from '../header/nisit.header';
import { event_name, event_start_date, place, status, event_start_time, event_type, updated_at, view_counts, interest_count} from './evdata.nisit';

//-------------------------------------- Styles Part ----------------------------

const useStyles = makeStyles((theme) => ({
  head: {
    marginTop: theme.spacing(16),
    marginBottom: 16,
  },
  root: {
    background: "#eeeeee"
  },
  eventbox: {
    margin: theme.spacing(0, 0, 3),
    background: "#b9f6ca",
  },
  paper: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerText: {
    marginTop: theme.spacing(16),
    marginBottom: 16,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '33.33%',
  },
}));

//-------------------------------------- End Styles Part --------------------------

export const NisitFeed : React.FC = () => {
  const classes = useStyles();

  //Input array after query from backend;
  //contain event detail one week ahead
  var events = [];

  //Change i to maximum array length
  for (let i = 0; i < event_name.length; i++) {
    events.push(
      <Grid container className={classes.eventbox}>

        <Grid item xs={9}>
        <div>
          <Box display="flex" flexDirection="row">
            <Typography>{event_name[i]}</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography>สถานะ: {status[i]}</Typography>
          </Box>
          <br></br>
          <Grid container>
            <Grid item xs={3}>
              <Typography>วันที่จัด: {event_start_date[i]}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>เวลา: {event_start_time[i]}</Typography>
            </Grid>
          </Grid>
          <Box display="flex" flexDirection="row">
            <Typography>สถานที่: {place[i]}</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography>ประเภท: {event_type[i]}</Typography>
          </Box>
        </div>
        </Grid>

        <Grid item xs={3}>
          <Link href="/nisit/eventdetail" target="_blank" style={{ textDecoration: 'none' }}>
            <Typography>รายละเอียดกิจกรรม</Typography>
            <Typography className={classes.secondaryHeading}>แก้ไขล่าสุด {updated_at[i]}</Typography>
          </Link>
          <br/><br/>
          <div>
            <Typography>View {view_counts[i]}</Typography>
            <Typography>Interest {interest_count[i]}</Typography>
          </div>
        </Grid>

      </Grid>
    )
    
  }

  return (
    <ThemeProvider theme={theme}>
      <NisitHeader />
        <Container className={classes.head} maxWidth="md">
          <Typography variant="h5" className={classes.headerText}>
            กิจกรรมที่กำลังจะมาถึง
          </Typography>
          <Container className={classes.root} maxWidth="md">
            {events}
          </Container>
        </Container>

    </ThemeProvider>  
  );
}
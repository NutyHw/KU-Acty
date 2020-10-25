import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { NisitHeader } from './../header/nisit.header';
import { evname, evdate, evlocation, evstatus, evtime, evtype, lastedit, evview, evinterest} from './evdata.nisit';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#197C4F',
      },
      secondary: {
        main: '#E2FCDB',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Mitr"',
        '"Segoe UI"',
        'Roboto',
      ].join(','),
    },
});

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
  //contain event detail one eek ahead
  var events = [];

  //Change i to maximum array length
  for (let i = 0; i < evname.length; i++) {
    events.push(
      <Grid container className={classes.eventbox}>

        <Grid item xs={9}>
        <div>
          <Box display="flex" flexDirection="row">
            <Typography>{evname[i]}</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography>สถานะ {evstatus[i]}</Typography>
          </Box>
          <br></br>
          <Grid container>
            <Grid item xs={3}>
              <Typography>วันที่จัด {evdate[i]}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>เวลา {evtime[i]}</Typography>
            </Grid>
          </Grid>
          <Box display="flex" flexDirection="row">
            <Typography>สถานที่ {evlocation[i]}</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography>ประเภท {evtype[i]}</Typography>
          </Box>
        </div>
        </Grid>

        <Grid item xs={3}>
          <Link href="/nisit/eventdetail" target="_blank" style={{ textDecoration: 'none' }}>
            <Typography>รายละเอียดกิจกรรม</Typography>
            <Typography className={classes.secondaryHeading}>แก้ไขล่าสุด {lastedit[i]}</Typography>
          </Link>
          <br/><br/>
          <div>
            <Typography>View {evview[i]}</Typography>
            <Typography>Interest {evinterest[i]}</Typography>
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

import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import { OrgHeader } from './../header/org.header';
import { evname, evdate, evlocation, evstatus, evtime, evtype, lastedit, evview, highestView, lowestView, highestIntr, lowestIntr} from './evdata.org';
import { highestViewEv, lowestViewEv, highestIntrEv, lowestIntrEv } from './evdata.org';
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
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(8),
    marginBottom: 16,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '33.33%',
  },
  button: {
    marginTop: 8,
  }
}));

//-------------------------------------- End Styles Part --------------------------

export const OrgFeed : React.FC = () => {
  const classes = useStyles();

  for (let i=0; i<evname.length; i++) {
    if (evview[i] == highestView) {
      const highestViewEv = evname[i];
      break;
    }
  }

  //Input array after query from backend;
  //contain event detail one week ahead
  var events = [];

  //Change i to maximum array length
  for (let i = 0; i < evname.length; i++) {
    events.push(
      <Grid container className={classes.eventbox}>

        <Grid item xs={6}>
        <div>
          <Box display="flex" flexDirection="row">
            <Typography>{evname[i]}</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography>สถานะ {evstatus[i]}</Typography>
          </Box>
          <br></br>
          <Grid container>
            <Grid item xs={6}>
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
          <Link href="https://github.com/NutyHw/KU-Acty/" target="_blank" style={{ textDecoration: 'none' }}>
            <Typography>รายละเอียดกิจกรรม</Typography>
            <Typography className={classes.secondaryHeading}>แก้ไขล่าสุด {lastedit[i]}</Typography>
          </Link>
          <br/><br/>
          <div>
            <Typography>View</Typography>
            <Typography>Interest</Typography>
          </div>
        </Grid>

        <Grid item xs={3}>
          <Link href="/org/createevent" style={{ textDecoration: 'none' }}>
            <Button className={classes.button} variant="outlined" style={{minWidth: 128}}>แก้ไขรายละเอียด</Button><br/>
          </Link>
          <Link href="/org/eventstatistic" style={{ textDecoration: 'none' }}>
            <Button className={classes.button} variant="outlined" style={{minWidth: 128}}>สถิติกิจกรรม</Button><br/>
          </Link>
          <Link href="/org/eventstatistic" style={{ textDecoration: 'none' }}>
            <Button className={classes.button} variant="outlined" style={{minWidth: 128}}>ลบกิจกรรม</Button>
          </Link>
        </Grid>

      </Grid>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <OrgHeader />
      <Grid container>
        <Container className={classes.head} maxWidth="md">
          <Typography variant="h5" className={classes.headerText}>
            กิจกรรมของคุณ
          </Typography>
          <Container className={classes.root} maxWidth="md">
            {events}
          </Container>
        </Container>

        <Container className={classes.head} maxWidth="xs">
          <Typography variant="h5" className={classes.headerText}>สถิติ</Typography>
          
          <Typography>กิจกรรมทั้งหมด {evname.length}</Typography>
          <br/>
          <Typography>จำนวนผู้เข้าชมหน้ารายละเอียดกิจกรรม</Typography>
          <Grid container>
            <Grid item xs={3}><Typography>สูงสุด:</Typography></Grid>
            <Grid item xs={6}><Typography>{highestViewEv}</Typography></Grid>
            <Grid item xs><Typography>{highestView}</Typography></Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}><Typography>ต่ำสุด</Typography></Grid>
            <Grid item xs={6}><Typography>{lowestViewEv}</Typography></Grid>
            <Grid item xs><Typography>{lowestView}</Typography></Grid>
          </Grid>
          <br/>

          <Typography>จำนวนผู้กดสนใจกิจกรรม</Typography>
          <Grid container>
            <Grid item xs={3}><Typography>สูงสุด:</Typography></Grid>
            <Grid item xs={6}><Typography>{highestIntrEv}</Typography></Grid>
            <Grid item xs><Typography>{highestIntr}</Typography></Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}><Typography>ต่ำสุด</Typography></Grid>
            <Grid item xs={6}><Typography>{lowestIntrEv}</Typography></Grid>
            <Grid item xs><Typography>{lowestIntr}</Typography></Grid>
          </Grid>
        </Container>
      </Grid>

    </ThemeProvider>  
  );
}
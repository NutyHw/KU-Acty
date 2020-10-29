import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import { theme } from './../theme/theme';
import { OrgHeader } from '../header/org.header';
import { api, setAuthToken } from '../../api/jsonPlaceholder.instance';
import { useHistory  } from 'react-router-dom';

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

export const Profile_OrgView : React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [ feeds, setFeeds ] = useState<any[]>([]);

  useEffect( () => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    api.get('/organizers/feed')
    .then( res => {
      setFeeds(res.data)
    })
  }, [])

  const onClick = ( eventId : string ) => {
    history.push({
      pathname: '/org/eventdetail/' + eventId
    })
  }

  const renderFeed = () => {
    return feeds.map( el => {
      let startTime = new Date(el.event_start_time)
      var dd = String(startTime.getDate()).padStart(2, '0');
      var mm = String(startTime.getMonth() + 1).padStart(2, '0');
      var yyyy = startTime.getFullYear().toString();
      const formatDate = dd + '/' + mm + '/' + yyyy
      const formatTime = startTime.getHours().toString().padStart(2, '0') + ':' + startTime.getMinutes().toString().padStart(2,'0')

      return  <Grid container className={classes.eventbox}>
        <Grid item xs={6}>
        <div>
          <Box display="flex" flexDirection="row">
            <Typography>{el.event_name}</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography>สถานะ: {el.status}</Typography>
          </Box>
          <br></br>
          <Grid container>
            <Grid item xs={6}>
              <Typography>วันที่จัด: { formatDate }</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>เวลา: { formatTime }</Typography>
            </Grid>
          </Grid>
          <Box display="flex" flexDirection="row">
            <Typography>สถานที่: {el.place}</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography>ประเภท: {el.event_type.join(',')}</Typography>
          </Box>
        </div>
        </Grid>

        <Grid item xs={3}>
          <Link  
            onClick = { () => onClick(el._id) }
            target="_blank"
          >
            <Typography>รายละเอียดกิจกรรม</Typography>
          </Link>
          <Typography className={classes.secondaryHeading}>แก้ไขล่าสุด { el.updated_at }</Typography>
          <br/><br/>
          <div>
            <Typography>View { el.view_counts }</Typography>
            <Typography>Interest { el.interest_count }</Typography>
          </div>
        </Grid>

    </Grid>
    } )
  }

  return (
    <ThemeProvider theme={theme}>
      <OrgHeader />
      <Grid container>
        <Container className={classes.head} maxWidth="xs">
          <Typography variant="h5" className={classes.headerText}>Insert Org Name here</Typography>
          <Typography variant="h5">(Profile Image?)</Typography>
          <br/>
          <Typography>สถานที่:</Typography>
          <Typography>ช่องทางติดต่อ:</Typography>
          <br/>
          <div>
              <Typography>รายละเอียด</Typography>
          </div>
            
        </Container>

        <Container className={classes.head} maxWidth="md">
          <Typography variant="h5" className={classes.headerText}>
            กิจกรรมขององค์กรนี้
          </Typography>
          <Container className={classes.root} maxWidth="md">
            { renderFeed() }
          </Container>
        </Container>
      </Grid>

    </ThemeProvider>  
  );
}
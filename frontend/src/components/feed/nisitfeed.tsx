import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './style';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarIcon from '@material-ui/icons/Star';

import { theme } from './../theme/theme';
import { NisitHeader } from '../header/nisit.header';
import { api, setAuthToken } from '../../api/jsonPlaceholder.instance';
import { useHistory  } from 'react-router-dom';

export const NisitFeed : React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [ feeds, setFeeds ] = useState<any[]>([]);

  useEffect( () => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    api.get('/nisits/feed')
    .then( res => {
      setFeeds(res.data)
    })
  }, [])

  useEffect( () => {
    console.log(feeds)
  }, [ feeds ])

  const onClick = ( eventId : string ) => {
    history.push({
      pathname: '/nisit/eventdetail/' + eventId
    })
  }

  function formatDateToString( date : Date ) { 
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = date.getFullYear();
      return dd + '/' + mm + '/' + yyyy;
  }

  const renderFeed = () => {
    return feeds.map( el => {
      let startTime = new Date(el.event_start_time)
      const updateDate = new Date(el.updated_at);
      var dd = String(startTime.getDate()).padStart(2, '0');
      var mm = String(startTime.getMonth() + 1).padStart(2, '0');
      var yyyy = startTime.getFullYear().toString();
      const formatDate = dd + '/' + mm + '/' + yyyy
      const formatTime = startTime.getHours().toString().padStart(2, '0') + ':' + startTime.getMinutes().toString().padStart(2,'0')
      const formatUpdate = formatDateToString(updateDate);
      
      return  <Box boxShadow={5}><Grid container className={classes.eventbox} justify="space-between">
        <Grid item xs={6} className={classes.paper}>
        <div>
          <Box display="flex" flexDirection="row">
            <Typography>{el.event_name}</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography>สถานะ: {el.status}</Typography>
          </Box>
          <br/>
          <Grid container>
            <Grid item xs={6}>
              <Typography>วันที่จัด: { formatDate }</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>เวลา: { formatTime } น.</Typography>
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

        <Grid item xs={3} className={classes.paper}>
          <Link  
            onClick = { () => onClick(el._id) }
            target="_blank"
          >
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              <KeyboardArrowRightIcon/>รายละเอียด
            </Button>
          </Link>
          <br/><br/>
          <Typography className={classes.secondaryHeading}>แก้ไขล่าสุด { formatUpdate }</Typography>
          <br/>
          <Grid item>
            <Typography>
              <VisibilityIcon/> { el.view_counts }
              <StarIcon className={classes.yell}/> { el.interest_count }
            </Typography>
          </Grid>
        </Grid>

    </Grid></Box>
    } )
  }

  return (
    <ThemeProvider theme={theme}>
      <NisitHeader />
        <Container className={classes.head} maxWidth="md">
          <Typography variant="h5" className={classes.headerTextN}>
            กิจกรรมที่กำลังจะมาถึง
          </Typography>
          <Container className={classes.root} maxWidth="md">
          <br/>{ renderFeed() }<br/>
          </Container>
        </Container>

    </ThemeProvider>
  );
}

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

export const Profile_NisitView : React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [ feeds, setFeeds ] = useState<any[]>([]);
  const [ org, setOrg ] = useState<any>(null);

  useEffect( () => {
    const token = localStorage.getItem('token')
    const orgId = localStorage.getItem('orgId')
    setAuthToken(token)
    api.get('/organizers/' + orgId + '/feed')
    .then( res => {
      setFeeds(res.data);
    })

    api.get('/organizers/' + orgId + '/profile')
    .then( res => {
      setOrg(res.data);
    } )
  }, [])

  useEffect( () => {
  }, [ org ])

  const onClick = ( eventId : string ) => {
    history.push({
      pathname: '/nisit/eventdetail/' + eventId
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
            <Button type="submit" variant="contained" color="primary" className={classes.submit}>
              <KeyboardArrowRightIcon/>รายละเอียด
            </Button>
          </Link>
          <br/><br/>
          <Typography className={classes.secondaryHeading}>แก้ไขล่าสุด { el.updated_at }</Typography>
          <br/>
          <Grid item>
            <Typography style={{display: 'flex', alignItems: 'center'}}>
              <VisibilityIcon/><Box m={0.25} /> { el.view_counts }<Box m={1} />
              <StarIcon/><Box m={0.25} /> { el.interest_count }
            </Typography>
          </Grid>
        </Grid>

    </Grid></Box>
    } )
  }

  return (
    <ThemeProvider theme={theme}>
      <NisitHeader />
      <Grid container>
        <Container className={classes.head} maxWidth="xs">
          <Typography variant="h5" className={classes.headerText}>{ org ? org.organizer_name : null }</Typography>
          <br/>
          <Typography>ที่ตั้ง: { org ? org.location  : null }</Typography>
          <Typography>ช่องทางติดต่อ: { org ? org.contact : null}</Typography>
          <br/>
          <div>
            <Typography>รายละเอียด: { org ? org.description : null }</Typography>
          </div>
            
        </Container>

        <Container className={classes.head} maxWidth="md">
          <Typography variant="h5" className={classes.headerText}>
            กิจกรรมที่จัด
          </Typography>
          <Container className={classes.root} maxWidth="md">
            <br/>{ renderFeed() }<br/>
          </Container>
        </Container>
      </Grid>

    </ThemeProvider>
  );
}


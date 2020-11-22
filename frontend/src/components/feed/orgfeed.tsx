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
import { OrgHeader } from '../header/org.header';
import { api, setAuthToken } from '../../api/jsonPlaceholder.instance';
import { useHistory  } from 'react-router-dom';

export const OrgFeed : React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [ feeds, setFeeds ] = useState<any[]>([]);
  const [ viewStat, setViewStat ] = useState<any[]>([]);
  const [ interestStat, setInterestStat ] = useState<any[]>([]);

  useEffect( () => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    api.get('/organizers/feed')
    .then( res => {
      setFeeds(res.data)
    })

  }, [])

  useEffect( () => {
    const sortEventByView = feeds.sort( (a,b) => a.view_counts - b.view_counts )
    .map( (elm) => ( { event_name : elm.event_name, view_counts : elm.view_counts } ) )
    const sortEventByInterest = feeds.sort( (a,b) => a.interest_count - b.interest_count )
    .map( (elm) => ( { event_name : elm.event_name, interest_count : elm.interest_count } ) )

    setViewStat(sortEventByView);
    setInterestStat(sortEventByInterest);
  }, [ feeds ])

  const onClickDetail = ( eventId : string ) => {
    history.push({
      pathname: '/org/eventdetail/' + eventId
    })
  }

  const onClickEdit = ( eventId : string ) => {
    history.push({
      pathname: '/org/editevent/' + eventId
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

      return  <Box boxShadow={5}><Grid container className={classes.eventbox}>
        <Grid item xs={6} className={classes.paper}>
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
            onClick = { () => onClickDetail(el._id) }
            target="_blank"
          >
            <Button className={classes.button} type="submit" variant="outlined" color="primary">
              <KeyboardArrowRightIcon/>รายละเอียด
            </Button>
          </Link>
          <br/><br/>
          <Typography className={classes.secondaryHeading}>แก้ไขล่าสุด { formatUpdate }</Typography>
          <br/>
          <Grid item>
            <Typography style={{display: 'flex', alignItems: 'center'}}>
              <VisibilityIcon/> { el.view_counts }
              <StarIcon/> { el.interest_count }
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={2} className={classes.paper}>
          <Link onClick = { () => onClickEdit(el._id) } style={{ textDecoration: 'none' }}>
            <Button className={classes.button} variant="contained" color="primary" style={{minWidth: 128}}>แก้ไขรายละเอียด</Button><br/>
          </Link>
          <Link onClick={ () => {
            localStorage.setItem('eventId',el._id)
            history.push('/org/statevent');
            } } style={{ textDecoration: 'none' }}>
            <Button className={classes.button} variant="outlined" style={{minWidth: 128}}>สถิติกิจกรรม</Button><br/>
          </Link>
        </Grid>
    </Grid></Box>
    } )
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
            <br/>
            { renderFeed() }<br/>
          </Container>
        </Container>

        <Container className={classes.head} maxWidth="xs">
          <Typography variant="h5" className={classes.headerText}>สถิติ</Typography>
          
          <Typography>กิจกรรมทั้งหมด {feeds.length}</Typography>
          <br/>
          <Typography>จำนวนผู้เข้าชมหน้ารายละเอียดกิจกรรม</Typography>
          <Grid container>
            <Grid item xs={3}><Typography>สูงสุด:</Typography></Grid>
            <Grid item xs={6}><Typography className={classes.secondaryText}>{ viewStat.length > 0 ? viewStat[viewStat.length-1].event_name : null }</Typography></Grid>
            <Grid item xs><Typography style={{display: 'flex', alignItems: 'center'}}><VisibilityIcon/>{ viewStat.length > 0 ? viewStat[viewStat.length-1].view_counts : null }</Typography></Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}><Typography>ต่ำสุด:</Typography></Grid>
            <Grid item xs={6}><Typography className={classes.secondaryText}>{ viewStat.length > 0 ? viewStat[0].event_name : null }</Typography></Grid>
            <Grid item xs><Typography style={{display: 'flex', alignItems: 'center'}}><VisibilityIcon/>{ viewStat.length > 0 ? viewStat[0].view_counts : null }</Typography></Grid>
          </Grid>
          <br/>

          <Typography>จำนวนผู้กดสนใจกิจกรรม</Typography>
          <Grid container>
            <Grid item xs={3}><Typography>สูงสุด:</Typography></Grid>
            <Grid item xs={6}><Typography className={classes.secondaryText}>{ interestStat.length > 0 ? interestStat[interestStat.length-1].event_name : null }</Typography></Grid>
            <Grid item xs><Typography style={{display: 'flex', alignItems: 'center'}}><StarIcon/>{ interestStat.length > 0 ? interestStat[interestStat.length-1].interest_count : null }</Typography></Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}><Typography>ต่ำสุด:</Typography></Grid>
            <Grid item xs={6}><Typography className={classes.secondaryText}>{ interestStat.length > 0 ? interestStat[0].event_name : null }</Typography></Grid>
            <Grid item xs><Typography style={{display: 'flex', alignItems: 'center'}}><StarIcon/>{ interestStat.length > 0 ? interestStat[0].interest_count : null }</Typography></Grid>
          </Grid>
        </Container>
      </Grid>

    </ThemeProvider>
  );
}

//@ts-nocheck
import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { theme, GreenDesc, useStyles, MenuProps } from './style';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarIcon from '@material-ui/icons/Star';
import { OrgHeader } from '../header/org.header';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Chart } from './chart';
import { api, setAuthToken } from '../../api/jsonPlaceholder.instance';

export const StatEvent : React.FC = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [ viewer, setViewer ] = useState<any[]>([]);
  const [ follower, setFollower ] = useState<any[]>([]);
  const [ eventDetail, setEventDetail ] = useState<any>(null);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect( () => {
    const token = localStorage.getItem('token');
    const eventId = localStorage.getItem('eventId');
    setAuthToken(token);
    api.get('/events/'+ eventId + '/stat/')
    .then( res => {
      setViewer(res.data.viewer);
      setFollower(res.data.follower);
    } )
    
    function padDigits (number : number, digits : number) {
      return Array(Math.max(digits - String(number).length + 1, 0)).join('0') + number;
    }

    api.get('/events/' + eventId + '/detail')
    .then( res => {
      const eventData = res.data
      const startTime = new Date(eventData.eventDetail.event_start_time)
      const endTime = new Date(eventData.eventDetail.event_end_time)

      eventData.eventDetail.event_start_date = padDigits(startTime.getDate(),2) + '/' + padDigits(startTime.getMonth(),2) + '/' + ( startTime.getFullYear() + 543 )
      eventData.eventDetail.event_start_clock = padDigits(startTime.getHours(),2) + ':' + padDigits(startTime.getMinutes(),2)

      eventData.eventDetail.event_end_date = padDigits(endTime.getDate(),2) + '/' + padDigits(endTime.getMonth(),2) + '/' + ( endTime.getFullYear() + 543 )
      eventData.eventDetail.event_end_clock = padDigits(endTime.getHours(),2) + ':' + padDigits(endTime.getMinutes(),2)
      setEventDetail(eventData);
    } )
  }, [])

  useEffect( () => {
    console.log(eventDetail)
  }, [ eventDetail ])

  return (
    <ThemeProvider theme={theme}>
      <OrgHeader/>
      <div className={classes.midpage}> 
      <Container component="main" maxWidth="md">
          <CssBaseline />   
          <Typography variant="h6" align="center" color="textPrimary">
            ข้อมูลเชิงสถิติ:
          </Typography>  
          <Typography align="left" color="textPrimary">
            ชื่อกิจกรรม: { eventDetail ? eventDetail.eventDetail.event_name : null }<br />
            ผู้จัดกิจกรรม: { eventDetail ? eventDetail.organizerDetail.organizer_name : null }
          </Typography>
          <Typography  align="left" color="textPrimary">
            <Grid container spacing={1}>
              <Grid item xs={4}>วันที่จัด: { eventDetail ? eventDetail.eventDetail.event_start_date : null }</Grid>
            <Grid item xs={4}>เวลาจัด:{ eventDetail ? eventDetail.eventDetail.event_start_clock : null}</Grid>
            <Grid item xs={4}>จำนวนชั่วโมง:{ eventDetail ? eventDetail.eventDetail.benefit_hour : null }</Grid>
            </Grid>
          </Typography>
          <Typography  align="left" color="textPrimary">
            ประเภทกิจกรรม : { eventDetail ? eventDetail.eventType : null }
          </Typography>
          <Typography align="right" color="textPrimary">
            <VisibilityIcon/> { eventDetail ? eventDetail.eventDetail.view_counts : null } view <StarIcon/> { eventDetail ? eventDetail.eventDetail.interest_count : null } คน
            <br />
          </Typography>

        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                  >
            <Typography className={classes.heading}>ผู้เข้าชม</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                  <Chart { ...viewer }/>
                </Box>
            </AccordionDetails>
        </Accordion>
        
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
              >
            <Typography className={classes.heading}>ผู้สนใจ</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                  <Chart {...follower}/>
                </Box>
            </AccordionDetails>
        </Accordion>
        
      </Container>
      </div>
    </ThemeProvider>   
  );
}

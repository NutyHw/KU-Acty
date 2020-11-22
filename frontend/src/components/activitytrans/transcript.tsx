import React, { useEffect, useState } from 'react'; import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { useStyles } from './style';
import { api, setAuthToken } from '../../api/jsonPlaceholder.instance';
import { NisitHeader } from '../header/nisit.header';
import { theme } from './../theme/theme';

export const NisitTranscript : React.FC = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<number>(-1);
  const [ transcript, setTranscript ] = useState<any>(null);

  const handleChange = (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : -1);
  };

  useEffect( () => { 
    const token = localStorage.getItem('token')
    setAuthToken(token);
    api.get('/nisits/transcript')
      .then( res => {
        setTranscript(res.data);
      } )
    .catch( err => {
      throw Error(err);
    } )
  },[] )
  
  const render = () => {
    if ( !transcript ){
      return null;
    }
    return transcript.transcript
    .sort( (v1 : any ,v2 : any) => v1.index - v2.index )
      .map( ( elm : any ,index : number ) => {
        return ( <Container maxWidth="lg"><Accordion expanded={expanded === index } onChange={handleChange(index)} key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />} 
              aria-controls={ index + "-content" }
              id={ index + "-header" }
          >
          <Typography className={classes.heading}>{ elm.type_name }</Typography>
          <Typography className={classes.secondaryHeading}> { elm.events.length } กิจกรรม { elm.sumHours } ชั่วโมง</Typography>
          <Typography className={classes.secondaryHeading}> จำนวนกิจกรรมที่ขาด { elm.participate_number - elm.events.length < 0 ? 0 : elm.participate_number - elm.events.length }</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container
              direction="column"
              justify="flex-start"
              alignItems="stretch">
              {
                elm.events.map( ( elm : any, index : number ) =>{
                  return (
                    <Grid item xs={12}>
                      <Typography className={classes.activityList} key={index}>
                        { elm.name }
                      </Typography>
                    </Grid>
                  )
                })
              }
              </Grid>
          </AccordionDetails>
      </Accordion></Container> )
      } )
  }

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
    <NisitHeader />
    <Typography align="center" className={classes.textHead}>
      จำนวนกิจกรรมทั้งหมด {transcript ? transcript.eventCount : null} กิจกรรม {transcript ? transcript.sumHours : null} ชั่วโมง
    </Typography>
      { render() }
    </div>
    </ThemeProvider>
  );
}

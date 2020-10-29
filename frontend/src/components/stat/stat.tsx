import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { theme, GreenDesc, useStyles, MenuProps } from './style';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import { OrgHeader } from '../header/org.header';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import  { Event } from './type'

export const StatEvent : React.FC = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

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
            ชื่อกิจกรรม:<br />
            ผู้จัดกิจกรรม:
          </Typography>
          <Typography  align="left" color="textPrimary">
            <Grid container spacing={1}>
            <Grid item xs={4}>วันที่จัด:</Grid>
            <Grid item xs={4}>เวลาจัด:</Grid>
            <Grid item xs={4}>จำนวนชั่วโมง:</Grid>
            </Grid>
          </Typography>
          <Typography  align="left" color="textPrimary">
            ประเภทกิจกรรม : 
          </Typography>
          <Typography align="right" color="textPrimary">
            <VisibilityIcon/> 0 view <TurnedInIcon/> 0 คน
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
                Pls wait graph component. It'll coming so...on.
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
                  mr.prayuth huakuy
                </Box>
            </AccordionDetails>
        </Accordion>
        
      </Container>
      </div>
    </ThemeProvider>   
  );
}

import React from 'react';
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ThemeProvider } from '@material-ui/core/styles';
import { NisitHeader } from './../header/nisit.header';

import { theme } from './../theme/theme';
import { useStyles } from './style';

export const NisitTranscript : React.FC = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

    //Variable Declaring (Unfinished; TBA)

    const total = {
        event: 6,
        time: 47,
        pass: false,
    }

    //Category 1 Activity (กิจกรรมมหาวิทยาลัย)
    const cat1 = {
        event: 3,
        time: 22,
        remain: 0,
        stat: 'ชั่วโมงกิจกรรมครบแล้ว',
    }
    const c1list = [
        <div>กิจกรรมที่ 1</div>,
        <div>กิจกรรมที่ 2</div>,
        <div>กิจกรรมที่ 3</div>,
    ]

    //Category 2 Activity (กิจกรรมเสริมสร้างสมรรถนะ)
    const cat2 = {
        event: 3,
        time: 25,
        remain: 1,
        stat: 'ขาด 1 กิจกรรม',
    }
    const c2list = [
        <div>กิจกรรมที่ 1</div>,
        <div>กิจกรรมที่ 2</div>,
        <div>กิจกรรมที่ 3</div>,
    ]

    //Category 3 Activity (กิจกรรมเพื่อสังคม)
    const cat3 = {
        event: 0,
        time: 0,
        remain: 1,
        stat: 'ขาด 1 กิจกรรม',
    }
    const c3list = [
        <div></div>,
    ]

  return (
    <div className={classes.root}>
        <NisitHeader />
        <ThemeProvider theme={theme}>
            <Typography align="center" className={classes.textHead}>จำนวนชั่วโมงกิจกรรมทั้งหมด {total.event} กิจกรรม {total.time} ชั่วโมง</Typography> 
        <Container maxWidth="md">
            
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />} 
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
            <Typography className={classes.heading}>กิจกรรมมหาวิทยาลัย</Typography>
            <Typography className={classes.secondaryHeading}>{cat1.event} กิจกรรม {cat1.time} ชั่วโมง</Typography>
            <Typography className={classes.secondaryHeading}>{cat1.stat}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography className={classes.activityList}>
                    {c1list}
                </Typography>
            </AccordionDetails>
        </Accordion>
        
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                >
            <Typography className={classes.heading}>กิจกรรมเสริมสร้างสมรรถนะ</Typography>
            <Typography className={classes.secondaryHeading}>{cat2.event} กิจกรรม {cat2.time} ชั่วโมง</Typography>
            <Typography className={classes.secondaryHeading}>ขาด {cat2.remain} กิจรรม</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography className={classes.activityList}>
                {c2list}
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
                >
            <Typography className={classes.heading}>กิจกรรมเพื่อสังคม</Typography>
            <Typography className={classes.secondaryHeading}>{cat3.event} กิจกรรม {cat3.time} ชั่วโมง</Typography>
            <Typography className={classes.secondaryHeading}>ขาด {cat3.remain} กิจรรม</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography className={classes.activityList}>
                {c3list}
            </Typography>
            </AccordionDetails>
        </Accordion>
        </Container>
        </ThemeProvider>
    
    </div>
  );
}
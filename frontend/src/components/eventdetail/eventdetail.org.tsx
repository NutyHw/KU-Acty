import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { OrgHeader } from './../header/org.header';
import { theme } from './../theme/theme';

//-------------------------------------- Styles Part ----------------------------
const GreenDesc = withStyles({
  root: {
    color: "#197C4F",
  }
})(Typography);

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(0),
      },
      input: {
        display: 'none',
    },
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  midpage: {
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    position: 'relative'
  },
  menu: {
    flexGrow: 0,
    position: 'relative'
  },
  login: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

}));


//-------------------------------------- End Styles Part ------------------------

type User = {
  username : string
  password : string
}

export const OrgEventDetail : React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <OrgHeader />

      <Container component="main" maxWidth="md">
        <ThemeProvider theme={theme}>
          <CssBaseline /><div className={classes.midpage}>    
          
          </div>
            <form className={classes.login} noValidate></form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    ชื่อกิจกรรม :
                  </Typography>
                </Grid>
              
                <Grid item xs={12}>
                <Typography variant="h6">
                    ผู้จัดกิจกรรม :
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                <Typography> 
                    ประเภทกิจกรรม : 
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>
                    จำนวนชั่วโมง :
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                <Typography>
                    สถานที่ :
                  </Typography>
                </Grid>


                <Grid item xs={6}>
                <Typography>
                    วันที่เริ่มกิจกรรม :
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                <Typography>
                    เวลาเริ่มกิจกรรม :
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                <Typography>
                    วันที่สิ้นสุดกิจกรรม :
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                <Typography>
                    เวลาสิ้นสุดกิจกรรม :
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                <Typography>
                    ช่องทางการติดต่อ :
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                <Typography>
                    รายละเอียดกิจกรรม :
                  </Typography>
                </Grid>
                </Grid>
            
            </ThemeProvider>   
      </Container>
      <Box mt={10}></Box>
    </ThemeProvider>  
    
  );
}

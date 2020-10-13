import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { relative } from 'path';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

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
    marginTop: theme.spacing(4),
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
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h4">KU ACTY</Typography>
          <Box m={1} />
          <Typography align="left" variant="body1" className={classes.title}>
            ระบบตรวจสอบและค้นหากิจกรรม มหาวิทยาลัยเกษตรศาสตร์
          </Typography>
          <IconButton color="inherit" href="/#">
              <PersonOutlineOutlinedIcon fontSize="large"/>
          </IconButton>
          
          <IconButton color="inherit" href="/login">
              <ExitToAppOutlinedIcon fontSize="large"/>
          </IconButton>
        </Toolbar>
      </AppBar> 
    </div>
    <AppBar position="static" elevation={0} color="secondary" > 
        <Toolbar variant="dense">
            <ButtonGroup variant="text" color="default" aria-label="text primary button group">
                <Button href="/org/home"><HomeOutlinedIcon/><Box m={0.25} />หน้าหลัก</Button>
                <Button href="/org/createevent"><PostAddOutlinedIcon/><Box m={0.25} />ประกาศกิจกรรม</Button>
                <Button href="/#"><SearchOutlinedIcon/><Box m={0.25} />ค้นหากิจกรรม</Button>
                </ButtonGroup>
        </Toolbar>
      </AppBar>

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
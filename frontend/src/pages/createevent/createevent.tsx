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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

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

  bar: {
    marginTop: theme.spacing(8),
    },
   

  paper: {
    marginTop: theme.spacing(1),
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
  submit: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 250,
    maxWidth: 540,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 750,
    },
  },
};

//-------------------------------------- End Styles Part ------------------------

const typenames = [
  'กิจกรรมมหาวิทยาลัย',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาคุณธรรม จริยธรรม',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาทักษะการคิดและการเรียนรู้',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคลและการสื่อสาร',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาสุขภาพ',
  'กิจกรรมเพื่อสังคม',
];

type User = {
  username : string
  password : string
}

export function UploadButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="images/*"
        className={classes.input}
        id="contained-button-file"
        style={{ display: "none" }}
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button 
        variant="outlined" 
        color="primary" 
        component="span" 
        fullWidth>
          แนบไฟล์นำเสนอกิจกรรม
        </Button>
      </label>
    </div>
  );
}

export const CreateEvent : React.FC = () => {
  const classes = useStyles();
  const [EventType, setEventType] = React.useState<string[]>([]);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEventType(event.target.value as string[]);
  };

  const handleChangeMultiple = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setEventType(value);
  };
  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0}>
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
    <AppBar className={classes.bar} position="fixed" elevation={0} color="secondary" > 
        <Toolbar variant="dense">
            <ButtonGroup variant="text" color="default" aria-label="text primary button group">
                <Button href="/org/home"><HomeOutlinedIcon/><Box m={0.25} />หน้าหลัก</Button>
                <Button><PostAddOutlinedIcon/><Box m={0.25} />ประกาศกิจกรรม</Button>
                <Button href="/#"><SearchOutlinedIcon/><Box m={0.25} />ค้นหากิจกรรม</Button>
                </ButtonGroup>
        </Toolbar>
      </AppBar>

      
      <Container component="main" maxWidth="sm">
        <ThemeProvider theme={theme}>
          <CssBaseline /><div className={classes.midpage}>    
          <Typography variant="h6" align="center" color="textPrimary">
            ประกาศกิจกรรม
          </Typography>  
          </div>
            <form className={classes.login} noValidate>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="eventname"
                    label="ชื่อกิจกรรม"
                    name="eventname"
                    type = "string"
                    color = "primary"
                    autoFocus 
                  />
                </Grid>
                
                <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl} >
                  <InputLabel id="eventtype">ประเภทกิจกรรม</InputLabel>
                  <Select
                    labelId="eventtype"
                    id="eventtype"
                    multiple
                    value={EventType}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                    MenuProps={MenuProps}
                  >
                    {typenames.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox color="primary" checked={EventType.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="hour"
                    label="จำนวนชั่วโมง"
                    name="hour"
                    type = "integer"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="startdate"
                    label="วันที่เริ่มกิจกรรม"
                    type="date"
                    defaultValue="2020-10-10"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    >
                  </TextField>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="time"
                    label="เวลาเริ่มกิจกรรม"
                    type="time"
                    defaultValue="06:00"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    
                    >
                  </TextField>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="enddate"
                    label="วันที่สิ้นสุดกิจกรรม"
                    type="date"
                    defaultValue="2020-10-10"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    >
                  </TextField>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="time"
                    label="เวลาสิ้นสุดกิจกรรม"
                    type="time"
                    defaultValue="18:00"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    
                    >
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="location"
                    label="สถานที่"
                    name="location"
                    type = "string"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="contact"
                    label="ช่องทางการติดต่อ"
                    name="contact"
                    type = "string"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="description"
                    label="รายละเอียดกิจกรรม"
                    name="description"
                    type = "string"
                    autoFocus
                    multiline
                    rows = {3}
                    rowsMax = {4}
                  />
                </Grid>
                
                <Grid item xs={5}>
                  <UploadButtons />
                </Grid>
                <Grid item xs={3}></Grid>
                
                <Grid item xs={4}> 
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    
                  >
                    ประกาศกิจกรรม
                  </Button>
                  </Grid>
                  </Grid>
            </form>
            </ThemeProvider>   
      </Container>
      <Box mt={10}></Box>
    </ThemeProvider>   
  );
}
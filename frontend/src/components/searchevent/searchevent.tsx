import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NisitHeader } from '../header/nisit.header';
// material ui import
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { theme, GreenDesc, useStyles, MenuProps } from './style';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Autocomplete from '@material-ui/lab/Autocomplete';

const typenames = [
  'กิจกรรมมหาวิทยาลัย',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาคุณธรรม จริยธรรม',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาทักษะการคิดและการเรียนรู้',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคลและการสื่อสาร',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาสุขภาพ',
  'กิจกรรมเพื่อสังคม',
];

export const SearchEvent : React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <NisitHeader/>
      <Container component="main" maxWidth="md">
        <ThemeProvider theme={theme}>
          <CssBaseline /><div className={classes.midpage}>    
          <Typography variant="h6" align="center" color="textPrimary">
            ค้นหากิจกรรม
          </Typography>  
          <Grid container spacing={1}>
          <Grid item xs={4}>
          <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  name="key"
                  label="ค้นหาด้วยชื่อกิจกรรม"
                  type="key"
                  id="key"
                />
          </Grid>

          <Grid item xs={2}>
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

            <Grid item xs={2}>
            <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="enddate"
                    label="วันที่กิจกรรมสิ้นสุด"
                    type="date"
                    defaultValue="2020-10-10"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    >
              </TextField>
            </Grid>

            <Grid item xs={4}>
            <Autocomplete
              multiple
              id="type"
              options={typenames}
              defaultValue={[typenames[6]]}
              filterSelectedOptions
              renderInput={(params) => (<TextField {...params} label="เลือกประเภทของกิจกรรม" placeholder="ประเภทของกิจกรรม" />)}
              />
            </Grid>
            </Grid>
            
            
            <Grid container spacing={1}>
            <Grid item xs={1}>
            <Button color="primary"><SearchOutlinedIcon/>ค้นหา</Button>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            </Grid>
          </div>

            
            </ThemeProvider>   
      </Container>
      <Box mt={10}></Box>
    </ThemeProvider>   
  );
}

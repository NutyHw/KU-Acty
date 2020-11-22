import { Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { PieChart, PieArcSeries } from "reaviz";
import Grid from "@material-ui/core/Grid";

export const Chart: React.FC = ( props : any ) => {
  return (
    <div style={{ margin: "55px", textAlign: "center" }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          จำแนกตามชั้นปี
        </Grid>
        <Grid item xs={6}>
          จำแนกตามเพศ
        </Grid>
        <Grid item xs={6}>
          <PieChart
            width={400}
            height={250}
            data={props.year}
            series={<PieArcSeries doughnut={true} animated={true} />}
          />
        </Grid>
        <Grid item xs={6}>
          <PieChart
            width={400}
            height={250}
            data={props.gender}
            series={<PieArcSeries doughnut={true} animated={true} />}
          />
        </Grid>
        <Grid item xs={12}>
          จำแนกตามคณะที่ศึกษา
        </Grid>
        <Grid item xs={6}>
          <PieChart
            width={800}
            height={500}
            data={props.major}
            series={<PieArcSeries doughnut={true} animated={true} />}
          />
        </Grid>
      </Grid>
    </div>
  );
};

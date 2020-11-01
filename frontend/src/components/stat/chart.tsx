import { Box } from "@material-ui/core";
import React from "react";
import { PieChart, PieArcSeries } from "reaviz";
import Grid from "@material-ui/core/Grid";

const year = [
  { key: "ปี 1", data: 7 },
  { key: "ปี 2", data: 14 },
  { key: "ปี 3", data: 5 },
  { key: "ปี 4 ขึ้นไป", data: 18 }
];

const gender = [
  { key: "ชาย", data: 10 },
  { key: "หญิง", data: 14 },
  { key: "ไม่ระบุ", data: 1 }
];

const major = [
  { key: "คณะเกษตร", data: 18 },
  { key: "คณะบริหารธุรกิจ", data: 18 },
  { key: "คณะประมง", data: 18 },
  { key: "คณะมนุษยศาสตร์", data: 18 },
  { key: "คณะวนศาสตร", data: 18 },
  { key: "คณะวิทยาศาสตร", data: 18 },
  { key: "คณะวิศวกรรมศาสตร", data: 18 },
  { key: "คณะศึกษาศาสตร", data: 18 },
  { key: "คณะเศรษฐศาสตร", data: 18 },
  { key: "คณะสถาปัตยกรรมศาสตร", data: 18 },
  { key: "คณะสังคมศาสตร", data: 18 },
  { key: "คณะสัตวแพทยศาสตร", data: 18 },
  { key: "คณะอุตสาหกรรมเกษตร", data: 18 },
  { key: "คณะเทคนิคการสัตวแพทย", data: 18 },
  { key: "คณะสิ่งแวดล้อม", data: 18 }
];

export const Mydata: React.FC = () => {
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
            data={year}
            series={<PieArcSeries doughnut={true} animated={true} />}
          />
        </Grid>
        <Grid item xs={6}>
          <PieChart
            width={400}
            height={250}
            data={gender}
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
            data={major}
            series={<PieArcSeries doughnut={true} animated={true} />}
          />
        </Grid>
      </Grid>
    </div>
  );
};

import React from "react";
import { Bar } from "react-chartjs-2";
import { Grid, Typography, Card, CardContent } from "@mui/material";

interface BarChartProps {
  barData: any;
}

const BarChart: React.FC<BarChartProps> = ({ barData }) => {
  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Typography variant="h6">Distribuição de Categorias</Typography>
          <Bar
            data={barData}
            options={{
              indexAxis: "y",
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Número de Tweets",
                  },
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BarChart;

import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { Pie } from "react-chartjs-2";

interface PieChartProps {
  pieData: any;
  totalTweets: number;
}

const PieChart: React.FC<PieChartProps> = ({ pieData, totalTweets }) => {
  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Typography variant="h6" align="center">
            Resumo de Sentimentos
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 464,
            }}
          >
            <Pie
              data={pieData}
              width={200} // Largura ajustada
              height={200} // Altura ajustada
              options={{
                plugins: {
                  datalabels: {
                    formatter: (value: number, context: any) => {
                      const label =
                        context.chart.data.labels[context.dataIndex];
                      const percentage =
                        ((value / totalTweets) * 100).toFixed(2) + "%";
                      return `${label}: ${value} (${percentage})`;
                    },
                    color: "#fff",
                  },
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PieChart;

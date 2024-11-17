import React from "react";
import { Bar } from "react-chartjs-2";
import { Grid, Typography, Card, CardContent } from "@mui/material";

interface StackedBarChartProps {
  data: {
    labels: string[];
    positive: number[];
    neutral: number[];
    negative: number[];
  };
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Positivo",
        data: data.positive,
        backgroundColor: "#4CAF50",
      },
      {
        label: "Neutro",
        data: data.neutral,
        backgroundColor: "#FFC107",
      },
      {
        label: "Negativo",
        data: data.negative,
        backgroundColor: "#F44336",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Explicitamente definir como constante para evitar erro de tipo
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Categoria",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Quantidade",
        },
      },
    },
  };

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Typography variant="h6" align="center">
            Distribuição de Sentimento por Categoria
          </Typography>
          <Bar data={chartData} options={options} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StackedBarChart;

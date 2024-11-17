import React from "react";
import { Radar, Doughnut } from "react-chartjs-2";
import { Grid, Typography, Card, CardContent, Box } from "@mui/material";
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Answer } from "../../interfaces/data";

// Registrar elementos do Chart.js para o gráfico de radar
Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface QuestionsInsightProps {
  answers: Answer[];
}

const QuestionsInsight: React.FC<QuestionsInsightProps> = ({ answers }) => {
  // Agrupar e contar perguntas por categoria
  const categories = Array.from(
    new Set(answers.map((answer) => answer.Custom_Category))
  );
  const categoryCounts = categories.map(
    (category) =>
      answers.filter((answer) => answer.Custom_Category === category).length
  );

  // Agrupar e contar perguntas por sentimento
  const sentimentCounts = {
    positive: answers.filter((answer) => answer.Sentiment === "positive")
      .length,
    neutral: answers.filter((answer) => answer.Sentiment === "neutral").length,
    negative: answers.filter((answer) => answer.Sentiment === "negative")
      .length,
  };

  // Configuração do gráfico de radar para categorias
  const radarData = {
    labels: categories,
    datasets: [
      {
        label: "Distribuição de Categorias",
        data: categoryCounts,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  // Configuração do gráfico de rosca para sentimentos
  const doughnutData = {
    labels: ["Positivo", "Neutro", "Negativo"],
    datasets: [
      {
        data: [
          sentimentCounts.positive,
          sentimentCounts.neutral,
          sentimentCounts.negative,
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Grid container spacing={4} mt={0.2}>
      {/* Gráfico de Radar para Distribuição de Categorias */}
      <Grid item xs={12} md={6}>
        <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
          <CardContent>
            <Typography
              variant="h6"
              align="center"
              sx={{ marginBottom: 2, fontWeight: "bold" }}
            >
              Distribuição de Categorias
            </Typography>
            <Box sx={{ maxWidth: 500, margin: "0 auto" }}>
              <Radar
                data={radarData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  scales: {
                    r: {
                      suggestedMin: 0,
                      ticks: { stepSize: 1 },
                    },
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Gráfico de Rosca para Distribuição de Sentimentos */}
      <Grid item xs={12} md={6}>
        <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
          <CardContent>
            <Typography
              variant="h6"
              align="center"
              sx={{ marginBottom: 2, fontWeight: "bold" }}
            >
              Distribuição de Sentimentos
            </Typography>
            <Box sx={{ maxWidth: 500, margin: "0 auto" }}>
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: { legend: { position: "bottom" } },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default QuestionsInsight;

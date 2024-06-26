import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  TimeScale,
  Title,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { format, parseISO } from "date-fns";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Registrar elementos do Chart.js
Chart.register(
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  TimeScale,
  Title,
  ChartDataLabels
);

// Tipos para os tweets e os sentimentos
type SentimentType = "positive" | "negative" | "neutral";

type CategoryType = "felicidade" | "tristeza" | "neutro";

interface Tweet {
  Identifier: string;
  Timestamp: string;
  Sentiment: SentimentType;
  Sentiment_Score: number;
  Content: string;
  Custom_Category: string;
}

interface SentimentDashboardProps {
  tweets: Tweet[];
}

const SentimentDashboard: React.FC<SentimentDashboardProps> = ({ tweets }) => {
  // Definição das cores para cada categoria
  const categoryColors: { [key in CategoryType]: string } = {
    felicidade: "#4CAF50", // Verde
    tristeza: "#F44336", // Vermelho
    neutro: "#FFC107", // Amarelo
    // Adicione outras categorias conforme necessário
  };
  // Verificar se o array de tweets está vazio
  if (tweets.length === 0) {
    return (
      <Box sx={{ flexGrow: 1, padding: 4, textAlign: "center" }}>
        <Typography variant="h4" color="textSecondary">
          Sem Tweets para Analisar
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Parece que ainda não temos tweets disponíveis para análise.
        </Typography>
      </Box>
    );
  }

  // Inicialização dos contadores e agrupadores
  const sentimentCounts: { [key in SentimentType]: number } = {
    positive: 0,
    negative: 0,
    neutral: 0,
  };

  const sentimentScores: { [key in SentimentType]: number[] } = {
    positive: [],
    negative: [],
    neutral: [],
  };

  const categoryCounts: { [key: string]: number } = {};
  const categoryScores: { [key: string]: number[] } = {};

  // Agrupamento de tweets por data e por categoria
  const dailySentiment = tweets.reduce((acc, tweet) => {
    const date = format(parseISO(tweet.Timestamp), "yyyy-MM-dd HH:mm");

    // Iniciar a estrutura de armazenamento
    if (!acc[date]) {
      acc[date] = {
        positive: [] as number[],
        negative: [] as number[],
        neutral: [] as number[],
      };
    }
    acc[date][tweet.Sentiment].push(tweet.Sentiment_Score);

    // Contagem de sentimentos
    sentimentCounts[tweet.Sentiment]++;
    sentimentScores[tweet.Sentiment].push(tweet.Sentiment_Score);

    // Contagem de categorias personalizadas
    if (!categoryCounts[tweet.Custom_Category]) {
      categoryCounts[tweet.Custom_Category] = 0;
      categoryScores[tweet.Custom_Category] = [];
    }
    categoryCounts[tweet.Custom_Category]++;
    categoryScores[tweet.Custom_Category].push(tweet.Sentiment_Score);

    return acc;
  }, {} as { [key: string]: { positive: number[]; negative: number[]; neutral: number[] } });

  // Preparação dos dados para o gráfico de linha
  const dates = Object.keys(dailySentiment).sort();
  const dailyAverageSentiments = dates.map((date) => {
    const dailyData = dailySentiment[date];
    return {
      date,
      positive: dailyData.positive.length
        ? dailyData.positive.reduce((a, b) => a + b, 0) /
          dailyData.positive.length
        : null,
      negative: dailyData.negative.length
        ? dailyData.negative.reduce((a, b) => a + b, 0) /
          dailyData.negative.length
        : null,
      neutral: dailyData.neutral.length
        ? dailyData.neutral.reduce((a, b) => a + b, 0) /
          dailyData.neutral.length
        : null,
    };
  });

  // Dados para o gráfico de pizza
  const pieData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        data: [
          sentimentCounts.positive,
          sentimentCounts.negative,
          sentimentCounts.neutral,
        ],
        backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
      },
    ],
  };

  // Dados para o gráfico de linha
  const lineData = {
    labels: dates,
    datasets: [
      {
        label: "Positive",
        data: dailyAverageSentiments.map((d) => d.positive),
        borderColor: "#4CAF50",
        fill: false,
      },
      {
        label: "Negative",
        data: dailyAverageSentiments.map((d) => d.negative),
        borderColor: "#F44336",
        fill: false,
      },
      {
        label: "Neutral",
        data: dailyAverageSentiments.map((d) => d.neutral),
        borderColor: "#FFC107",
        fill: false,
      },
    ],
  };

  // Dados para o gráfico de barras do número de tweets por categoria
  const barData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Número de Tweets",
        data: Object.values(categoryCounts),
        backgroundColor: Object.keys(categoryCounts).map(
          (category) => categoryColors[category as CategoryType] || "#AB47BC" // Use a cor padrão se a categoria não estiver mapeada
        ),
      },
    ],
  };

  // Dados para o gráfico de barras da média de sentimentos por categoria
  const avgSentimentByCategory = {
    labels: Object.keys(categoryScores),
    datasets: [
      {
        label: "Média da Pontuação de Sentimento",
        data: Object.values(categoryScores).map(
          (scores) => scores.reduce((a, b) => a + b, 0) / scores.length
        ),
        backgroundColor: Object.keys(categoryScores).map(
          (category) => categoryColors[category as CategoryType] || "#BA68C8" // Use a cor padrão se a categoria não estiver mapeada
        ),
      },
    ],
  };

  // Ordenar tweets por data, mais recentes primeiro
  const sortedTweets = [...tweets].sort(
    (a, b) => parseISO(b.Timestamp).getTime() - parseISO(a.Timestamp).getTime()
  );

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Grid container spacing={4}>
        {/* Resumo de Sentimentos */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Resumo de Sentimentos</Typography>
              <Pie
                data={pieData}
                options={{
                  plugins: {
                    datalabels: {
                      formatter: (value, context) => {
                        const label =
                          context.chart.data.labels[context.dataIndex];
                        const percentage =
                          ((value / tweets.length) * 100).toFixed(2) + "%";
                        return `${label}: ${value} (${percentage})`;
                      },
                      color: "#fff",
                      backgroundColor: (context) =>
                        context.dataset.backgroundColor,
                      borderRadius: 4,
                      font: {
                        weight: "bold",
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Tendência de Sentimentos ao Longo do Tempo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Tendência de Sentimentos</Typography>
              <Line
                data={lineData}
                options={{
                  scales: {
                    x: {
                      type: "time",
                      time: {
                        unit: "hour",
                        tooltipFormat: "Pp",
                        displayFormats: {
                          hour: "HH:mm",
                        },
                      },
                      title: {
                        display: true,
                        text: "Data e Hora",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Pontuação Média do Sentimento",
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Título entre gráficos de sentimentos e categorias */}
        <Grid item xs={12}>
          <Typography variant="h6" color="textSecondary" align="center">
            Dados de Categorias Personalizadas
          </Typography>
        </Grid>

        {/* Distribuição de Categorias */}
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

        {/* Média de Sentimento por Categoria */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Média da Pontuação de Sentimento por Categoria
              </Typography>
              <Bar
                data={avgSentimentByCategory}
                options={{
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Categoria",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Média da Pontuação de Sentimento",
                      },
                      suggestedMin: 0,
                      suggestedMax: 1,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Tabela de Tweets Recentes */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Tweets Recentes</Typography>
              <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                {sortedTweets.slice(0, 10).map((tweet) => {
                  let sentimentColor;
                  if (tweet.Sentiment === "positive") {
                    sentimentColor = "#4CAF50";
                  } else if (tweet.Sentiment === "negative") {
                    sentimentColor = "#F44336";
                  } else {
                    sentimentColor = "#FFC107";
                  }

                  return (
                    <Box
                      key={tweet.Identifier}
                      sx={{
                        borderBottom: "1px solid #e0e0e0",
                        padding: "8px 0",
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        {format(parseISO(tweet.Timestamp), "dd/MM/yyyy HH:mm")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: sentimentColor }}
                      >
                        {tweet.Content}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={sentimentColor}
                        sx={{ fontWeight: "bold" }}
                      >
                        Sentimento: {tweet.Sentiment} (Score:{" "}
                        {tweet.Sentiment_Score.toFixed(2)})
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Categoria: {tweet.Custom_Category}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Indicadores de Sentimento */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Estatísticas de Sentimentos</Typography>
              <Typography variant="body1">
                Total de Tweets: {tweets.length}
              </Typography>
              <Typography variant="body1" sx={{ color: "#4CAF50" }}>
                Positivos: {sentimentCounts.positive} (
                {((sentimentCounts.positive / tweets.length) * 100).toFixed(2)}
                %)
              </Typography>
              <Typography variant="body1" sx={{ color: "#F44336" }}>
                Negativos: {sentimentCounts.negative} (
                {((sentimentCounts.negative / tweets.length) * 100).toFixed(2)}
                %)
              </Typography>
              <Typography variant="body1" sx={{ color: "#FFC107" }}>
                Neutros: {sentimentCounts.neutral} (
                {((sentimentCounts.neutral / tweets.length) * 100).toFixed(2)}%)
              </Typography>
              <Box>
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Estatísticas por Categoria
                </Typography>
                {Object.keys(categoryCounts).map((category) => (
                  <Typography
                    key={category}
                    variant="body1"
                    sx={{
                      color:
                        categoryColors[category as CategoryType] || "#000000",
                    }}
                  >
                    {category}: {categoryCounts[category]} (
                    {((categoryCounts[category] / tweets.length) * 100).toFixed(
                      2
                    )}
                    %)
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SentimentDashboard;

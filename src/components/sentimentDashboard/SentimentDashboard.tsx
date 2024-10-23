import React from "react";
import { Box, Grid, Typography, Card } from "@mui/material";
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
import mockTweets from "@/utils/mockTweets";
import SentimentLineChart from "./SentimentLineChart";
import { Tweet } from "../../interfaces/Tweet";
import { SentimentType } from "@/interfaces/SentimentType";
import { CategoryType } from "@/interfaces/CategoryType";
import SentimentAnalysisSummary from "./SentimentAnalysisSummary";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import TweetsTable from "./TweetsTable";

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

interface SentimentDashboardProps {
  tweets: Tweet[];
}

const SentimentDashboard: React.FC<SentimentDashboardProps> = ({ tweets }) => {
  tweets = mockTweets;

  // Definição das cores para cada categoria
  const categoryColors: { [key in CategoryType]: string } = {
    felicidade: "#4CAF50",
    tristeza: "#F44336",
    neutro: "#FFC107",
    neutral: "#FFC107",
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

  // Dados para o gráfico de barras do número de tweets por categoria
  const barData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Número de Tweets",
        data: Object.values(categoryCounts),
        backgroundColor: Object.keys(categoryCounts).map(
          (category) => categoryColors[category as CategoryType] || "#AB47BC"
        ),
      },
    ],
  };

  // Ordenar tweets por data, mais recentes primeiro
  const sortedTweets = [...tweets].sort(
    (a, b) => parseISO(b.Timestamp).getTime() - parseISO(a.Timestamp).getTime()
  );

  const getSentimentOverTimeData = (results: any) => {
    const data = results.reduce((acc: any, result: any) => {
      const date = new Date(result.Timestamp).toLocaleDateString();
      const existingEntry = acc.find((entry: any) => entry.date === date);

      if (existingEntry) {
        existingEntry[result.Sentiment]++;
      } else {
        acc.push({
          date,
          positive: result.Sentiment === "positive" ? 1 : 0,
          negative: result.Sentiment === "negative" ? 1 : 0,
          neutral: result.Sentiment === "neutral" ? 1 : 0,
        });
      }

      return acc;
    }, []);

    return data;
  };

  const sentimentOverTimeData = getSentimentOverTimeData(tweets);

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Grid container spacing={4}>
        {/* Resumo de Sentimentos */}
        <PieChart pieData={pieData} totalTweets={tweets.length} />

        {/* Resumo de tweets */}
        <Grid item xs={12} md={6}>
          <SentimentAnalysisSummary results={tweets} />
        </Grid>

        {/* Tendência de Sentimentos ao Longo do Tempo */}
        <Grid item xs={12} md={12}>
          <Card>
            <SentimentLineChart sentimentOverTimeData={sentimentOverTimeData} />
          </Card>
        </Grid>

        {/* Título entre gráficos de sentimentos e categorias */}
        <Grid item xs={12}>
          <Typography variant="h6" color="textSecondary" align="center">
            Dados de Categorias Personalizadas
          </Typography>
        </Grid>

        {/* Distribuição de Categorias */}
        <BarChart barData={barData} />

        {/* Tabela de Tweets Recentes */}
        <TweetsTable tweets={sortedTweets.slice(0, 10)} />
      </Grid>
    </Box>
  );
};

export default SentimentDashboard;

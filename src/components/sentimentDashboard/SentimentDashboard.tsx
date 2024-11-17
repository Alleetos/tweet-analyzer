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
import { mockData } from "@/utils/mockData";
import SentimentLineChart from "./SentimentLineChart";
import { SentimentType } from "@/interfaces/SentimentType";
import { CategoryType } from "@/interfaces/CategoryType";
import SentimentAnalysisSummary from "./SentimentAnalysisSummary";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import TweetsTable from "./TweetsTable";
import StackedBarChart from "./StackedBarChart";
import QuestionsInsight from "./QuestionsInsight";

import { Tweet, Answer } from "@/interfaces/data";

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
  data: typeof mockData;
}

const SentimentDashboard: React.FC<SentimentDashboardProps> = ({ data }) => {
  // Extraindo tweets e respostas
  const tweets = (data?.results?.tweets_analysis as Tweet[]) || [];
  const answers = (data?.results?.answers_analysis as Answer[]) || [];

  const categoryColors: { [key in CategoryType]: string } = {
    Alegria: "#4CAF50", // Verde
    Raiva: "#FF5722", // Laranja
    Nojo: "#8BC34A", // Verde claro
    Medo: "#9C27B0", // Roxo
    Tristeza: "#F44336", // Vermelho
    neutral: "#FFC107",
  };

  if (tweets.length === 0 && answers.length === 0) {
    return (
      <Box sx={{ flexGrow: 1, padding: 4, textAlign: "center" }}>
        <Typography variant="h4" color="textSecondary">
          Sem Dados para Análise
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Parece que ainda não temos tweets ou respostas disponíveis para
          análise.
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

  // Função de processamento para tweets e respostas
  const processSentimentData = (entries: (Tweet | Answer)[]) => {
    return entries.reduce((acc, entry) => {
      const date = format(parseISO(entry?.Timestamp), "yyyy-MM-dd HH:mm");

      // Iniciar a estrutura de armazenamento
      if (!acc[date]) {
        acc[date] = {
          positive: [] as number[],
          negative: [] as number[],
          neutral: [] as number[],
        };
      }
      acc[date][entry.Sentiment].push(entry.Sentiment_Score);

      // Contagem de sentimentos
      sentimentCounts[entry.Sentiment]++;
      sentimentScores[entry.Sentiment].push(entry.Sentiment_Score);

      // Contagem de categorias personalizadas
      if (!categoryCounts[entry.Custom_Category]) {
        categoryCounts[entry.Custom_Category] = 0;
        categoryScores[entry.Custom_Category] = [];
      }
      categoryCounts[entry.Custom_Category]++;
      categoryScores[entry.Custom_Category].push(entry.Sentiment_Score);

      return acc;
    }, {} as { [key: string]: { positive: number[]; negative: number[]; neutral: number[] } });
  };

  // Processar tweets e respostas
  const dailySentiment = {
    ...processSentimentData(tweets),
    ...processSentimentData(answers),
  };

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

  // Dados para o gráfico de barras do número de tweets/respostas por categoria
  const barData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Número de Entradas",
        data: Object.values(categoryCounts),
        backgroundColor: Object.keys(categoryCounts).map(
          (category) => categoryColors[category as CategoryType] || "#AB47BC"
        ),
      },
    ],
  };

  // Ordenar tweets e respostas por data, mais recentes primeiro
  const sortedEntries = [...tweets, ...answers].sort(
    (a, b) => parseISO(a.Timestamp).getTime() - parseISO(b.Timestamp).getTime()
  );

  const getSentimentOverTimeData = (results: (Tweet | Answer)[]) => {
    const data = results.reduce((acc: any, result) => {
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

  const sentimentOverTimeData = getSentimentOverTimeData([
    ...tweets,
    ...answers,
  ]);

  // Preparar dados para o gráfico de barras empilhadas
  const categories = [
    "Alegria",
    "Raiva",
    "Nojo",
    "Medo",
    "Tristeza",
    "neutral",
  ];
  const stackedBarData = {
    labels: categories,
    positive: categories.map(
      (category) =>
        tweets.filter(
          (t) => t.Custom_Category === category && t.Sentiment === "positive"
        ).length +
        answers.filter(
          (a) => a.Custom_Category === category && a.Sentiment === "positive"
        ).length
    ),
    neutral: categories.map(
      (category) =>
        tweets.filter(
          (t) => t.Custom_Category === category && t.Sentiment === "neutral"
        ).length +
        answers.filter(
          (a) => a.Custom_Category === category && a.Sentiment === "neutral"
        ).length
    ),
    negative: categories.map(
      (category) =>
        tweets.filter(
          (t) => t.Custom_Category === category && t.Sentiment === "negative"
        ).length +
        answers.filter(
          (a) => a.Custom_Category === category && a.Sentiment === "negative"
        ).length
    ),
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Grid container spacing={4}>
        {/* Resumo de Sentimentos */}
        <PieChart
          pieData={pieData}
          totalTweets={tweets.length + answers.length}
        />
        {/* Resumo de entradas */}
        <Grid item xs={12} md={6}>
          <SentimentAnalysisSummary tweets={tweets} answers={answers} />
        </Grid>
        {/* Tendência de Sentimentos ao Longo do Tempo */}
        <Grid item xs={12} md={12}>
          <Card>
            <SentimentLineChart sentimentOverTimeData={sentimentOverTimeData} />
          </Card>
        </Grid>
        {/* Título entre gráficos de sentimentos e categorias */}
        <Grid item xs={12}>
          <Typography variant="h5" color="textSecondary" align="center">
            Dados de Categorias Personalizadas
          </Typography>
        </Grid>
        {/* Distribuição de Categorias */}
        <BarChart barData={barData} />
        <StackedBarChart data={stackedBarData} />
        {/* Tabela de Entradas Recentes */}
        {tweets.length > 0 && (
          <TweetsTable tweets={sortedEntries.slice(0, 10)} />
        )}
        <Grid item xs={12}>
          <Typography variant="h5" color="textSecondary" align="center">
            Dados do formulário
          </Typography>
        </Grid>
        <QuestionsInsight answers={answers} />
      </Grid>
    </Box>
  );
};

export default SentimentDashboard;

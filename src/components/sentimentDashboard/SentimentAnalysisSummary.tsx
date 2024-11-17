import React from "react";
import { Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CategoryIcon from "@mui/icons-material/Category";
import { Tweet, Answer } from "../../interfaces/data";

interface SentimentAnalysisSummaryProps {
  tweets: Tweet[];
  answers: Answer[];
}

const SentimentAnalysisSummary = ({
  tweets,
  answers,
}: SentimentAnalysisSummaryProps) => {
  const totalItems = tweets.length + answers.length;

  // Contagens de Sentimento (Geral)
  const positiveCount = [...tweets, ...answers].filter(
    (r) => r.Sentiment === "positive"
  ).length;
  const negativeCount = [...tweets, ...answers].filter(
    (r) => r.Sentiment === "negative"
  ).length;
  const neutralCount = [...tweets, ...answers].filter(
    (r) => r.Sentiment === "neutral"
  ).length;

  // Contagens de categorias personalizadas (Geral)
  const customFelicidade = [...tweets, ...answers].filter(
    (r) => r.Custom_Category === "felicidade"
  ).length;
  const customTristeza = [...tweets, ...answers].filter(
    (r) => r.Custom_Category === "tristeza"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-96">
      {/* Card para Total Geral */}
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-full">
        <div className="text-center">
          <IconButton>
            <CategoryIcon className="text-blue-500" style={{ fontSize: 40 }} />
          </IconButton>
          <Typography variant="h6">Total Geral</Typography>
          <Typography variant="h4">{totalItems}</Typography>
          <Typography variant="body2" color="textSecondary">
            Tweets: {tweets.length} | Perguntas: {answers.length}
          </Typography>
        </div>
      </div>

      {/* Card para Positivos (Geral) */}
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-full">
        <div className="text-center">
          <IconButton>
            <ThumbUpIcon className="text-green-600" style={{ fontSize: 40 }} />
          </IconButton>
          <Typography variant="h6">Positivos</Typography>
          <Typography variant="h4">{positiveCount}</Typography>
        </div>
      </div>

      {/* Card para Neutros (Geral) */}
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-full">
        <div className="text-center">
          <IconButton>
            <RemoveCircleIcon
              className="text-yellow-500"
              style={{ fontSize: 40 }}
            />
          </IconButton>
          <Typography variant="h6">Neutros</Typography>
          <Typography variant="h4">{neutralCount}</Typography>
        </div>
      </div>

      {/* Card para Negativos (Geral) */}
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-full">
        <div className="text-center">
          <IconButton>
            <ThumbDownIcon className="text-red-600" style={{ fontSize: 40 }} />
          </IconButton>
          <Typography variant="h6">Negativos</Typography>
          <Typography variant="h4">{negativeCount}</Typography>
        </div>
      </div>

      {/* Novo Card para Categorias Personalizadas (Ocupando 2 colunas) */}
      <div className="col-span-2 bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-full">
        <div className="text-center">
          <IconButton>
            <CategoryIcon
              className="text-purple-600"
              style={{ fontSize: 40 }}
            />
          </IconButton>
          <Typography variant="h6">Categorias Personalizadas</Typography>
          <Typography variant="body2">
            Felicidade: {customFelicidade}
          </Typography>
          <Typography variant="body2">Tristeza: {customTristeza}</Typography>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysisSummary;

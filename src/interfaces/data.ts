import { SentimentType } from "./SentimentType";

export interface DataEntry {
  Identifier: string;
  Timestamp: string;
  Sentiment: SentimentType;
  Sentiment_Score: number;
  Content: string;
  Custom_Category: string;
  Custom_Score: number;
}

// Interface para Tweet
export interface Tweet extends DataEntry {
  // Aqui usamos apenas a estrutura de DataEntry
  // Se precisar adicionar propriedades específicas, adicione-as aqui
}

// Interface para Answer
export interface Answer extends DataEntry {
  Category: string; // Propriedade específica de Answer
  Answer_Number: number; // Propriedade específica de Answer
}

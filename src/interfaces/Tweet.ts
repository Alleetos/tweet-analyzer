import { SentimentType } from "./SentimentType";

export interface Tweet {
  Identifier: string;
  Timestamp: string;
  Sentiment: SentimentType;
  Sentiment_Score: number;
  Content: string;
  Custom_Category: string;
}

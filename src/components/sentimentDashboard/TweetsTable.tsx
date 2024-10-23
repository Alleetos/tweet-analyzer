import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { format, parseISO } from "date-fns";
import { Tweet } from "../../interfaces/Tweet";

interface TweetsTableProps {
  tweets: Tweet[];
}

const TweetsTable: React.FC<TweetsTableProps> = ({ tweets }) => {
  const sortedTweets = [...tweets].sort(
    (a, b) => parseISO(b.Timestamp).getTime() - parseISO(a.Timestamp).getTime()
  );

  return (
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
                  <Typography variant="body1" sx={{ color: sentimentColor }}>
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
  );
};

export default TweetsTable;

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { Tweet } from "../../interfaces/data";

interface TweetsTableProps {
  tweets: Tweet[]; // A lista de tweets deve conter apenas itens relacionados ao Twitter
}

const TweetsTable: React.FC<TweetsTableProps> = ({ tweets }) => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Últimos Tweets
          </Typography>
          <Box sx={{ maxHeight: 500, overflowY: "auto" }}>
            {tweets.slice(0, 10).map((tweet) => {
              // Definir cor do sentimento
              const sentimentColor =
                tweet.Sentiment === "positive"
                  ? "#4CAF50"
                  : tweet.Sentiment === "negative"
                  ? "#F44336"
                  : "#FFC107";

              return (
                <Box
                  key={tweet.Identifier}
                  sx={{
                    padding: "12px 16px",
                    borderRadius: 2,
                    marginBottom: 1,
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {/* Data e Hora */}
                  <Typography variant="body2" color="textSecondary">
                    {format(parseISO(tweet.Timestamp), "dd/MM/yyyy HH:mm")}
                  </Typography>

                  {/* Conteúdo do Tweet */}
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, marginTop: 0.5 }}
                  >
                    {tweet.Content}
                  </Typography>

                  {/* Sentimento e Score */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: sentimentColor,
                      fontWeight: "bold",
                      marginTop: 0.5,
                    }}
                  >
                    Sentimento: {tweet.Sentiment}
                  </Typography>

                  {/* Categoria */}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontStyle: "italic", marginTop: 0.5 }}
                  >
                    Categoria: {tweet.Custom_Category}
                  </Typography>

                  {/* Divisor entre tweets */}
                  <Divider sx={{ marginTop: 2 }} />
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

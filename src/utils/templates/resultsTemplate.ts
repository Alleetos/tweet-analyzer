export const resultsTemplate = (results: any) => {
  const tweets = results.tweets_analysis || [];
  const answers = results.answers_analysis || [];

  // Contando sentimentos
  const totalTweets = tweets.length;
  const totalAnswers = answers.length;

  const positiveCount =
    tweets.filter((t: any) => t.Sentiment === "positive").length +
    answers.filter((a: any) => a.Sentiment === "positive").length;
  const negativeCount =
    tweets.filter((t: any) => t.Sentiment === "negative").length +
    answers.filter((a: any) => a.Sentiment === "negative").length;
  const neutralCount =
    tweets.filter((t: any) => t.Sentiment === "neutral").length +
    answers.filter((a: any) => a.Sentiment === "neutral").length;

  // Determinando o sentimento predominante
  let predominantSentiment = "neutral";
  if (positiveCount > negativeCount && positiveCount > neutralCount) {
    predominantSentiment = "positive";
  } else if (negativeCount > positiveCount && negativeCount > neutralCount) {
    predominantSentiment = "negative";
  }

  // Mensagem motivacional
  const motivationalMessage =
    predominantSentiment === "positive"
      ? "Continue assim! Sua perspectiva positiva é inspiradora."
      : predominantSentiment === "negative"
      ? "Lembre-se: até nos momentos mais desafiadores, há espaço para crescimento e novas oportunidades. Você é mais forte do que imagina!"
      : "Sua neutralidade mostra equilíbrio. Continue explorando e refletindo sobre seus sentimentos.";

  // Mensagem alternativa caso não haja dados
  const noDataMessage =
    totalTweets === 0 && totalAnswers === 0
      ? '<p style="font-size: 16px; color: #333; text-align: center;">Nenhum dado foi analisado. Por favor, forneça informações para análise futura!</p>'
      : "";

  // Gerando o template
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f4f8fb; color: #333; border-radius: 8px;">
      <h2 style="text-align: center; color: #1DA1F2;">Seu Feedback de Sentimento</h2>
      ${
        noDataMessage ||
        `
      <p style="font-size: 16px; color: #333; text-align: center;">
        Olá! Analisamos seus dados e aqui está uma visão geral dos seus sentimentos recentes:
      </p>
      <div style="margin: 20px 0; text-align: center;">
        <p style="font-size: 16px; color: #333;">Total de Tweets Analisados: <strong>${totalTweets}</strong></p>
        <p style="font-size: 16px; color: #333;">Total de Respostas Analisadas: <strong>${totalAnswers}</strong></p>
        <p style="font-size: 16px; color: #4CAF50;">Sentimentos Positivos: <strong>${positiveCount}</strong></p>
        <p style="font-size: 16px; color: #FF5722;">Sentimentos Negativos: <strong>${negativeCount}</strong></p>
        <p style="font-size: 16px; color: #FFC107;">Sentimentos Neutros: <strong>${neutralCount}</strong></p>
      </div>
      <p style="font-size: 16px; color: #333; text-align: center;">
        Sentimento predominante atual: <strong>${predominantSentiment}</strong>
      </p>
      <div style="margin: 20px 0; padding: 20px; background-color: #fff; border-radius: 8px; text-align: center;">
        <p style="font-size: 18px; color: #333;"><strong>Mensagem Motivacional:</strong></p>
        <p style="font-size: 16px; color: #555;">${motivationalMessage}</p>
      </div>
      `
      }
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="font-size: 12px; color: #999; text-align: center;">
        © 2024 Tweet Analyzer. Todos os direitos reservados.
      </p>
    </div>
  `;
};

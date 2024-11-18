export const resultsTemplate = (results: any) => {
  const tweets = results.tweets_analysis || [];
  const answers = results.answers_analysis || [];

  // Contando categorias personalizadas
  const totalTweets = tweets.length;
  const totalAnswers = answers.length;

  // Tipagem explícita para categorias
  type Category = "medo" | "alegria" | "nojo" | "raiva" | "tristeza";

  // Contando categorias personalizadas
  const categoryCounts: Record<Category, number> = {
    medo:
      tweets.filter((t: any) => t.Custom_Category === "medo").length +
      answers.filter((a: any) => a.Custom_Category === "medo").length,
    alegria:
      tweets.filter((t: any) => t.Custom_Category === "alegria").length +
      answers.filter((a: any) => a.Custom_Category === "alegria").length,
    nojo:
      tweets.filter((t: any) => t.Custom_Category === "nojo").length +
      answers.filter((a: any) => a.Custom_Category === "nojo").length,
    raiva:
      tweets.filter((t: any) => t.Custom_Category === "raiva").length +
      answers.filter((a: any) => a.Custom_Category === "raiva").length,
    tristeza:
      tweets.filter((t: any) => t.Custom_Category === "tristeza").length +
      answers.filter((a: any) => a.Custom_Category === "tristeza").length,
  };

  // Determinando a categoria predominante
  const predominantCategory: Category = Object.keys(categoryCounts).reduce(
    (a, b) =>
      categoryCounts[a as Category] > categoryCounts[b as Category] ? a : b
  ) as Category;

  // Mensagens motivacionais e links por categoria
  const categoryRecommendations: Record<
    Category,
    { message: string; link: string }
  > = {
    medo: {
      message:
        "É normal sentir medo, mas lembre-se de que superar desafios fortalece. Confie no seu potencial!",
      link: "https://youtu.be/KlU-GIoayMo?si=gpn1sfBGSq_urDEn",
    },
    alegria: {
      message:
        "Sua alegria é contagiante! Continue espalhando essa energia positiva ao seu redor.",
      link: "https://www.youtube.com/watch?v=YNUp_UXOiyg&list=PLx-90r8WoFGZkG1gHRg0TwoWt6jtNkUhy&index=12",
    },
    nojo: {
      message:
        "Sentir aversão faz parte da vida. Use isso como oportunidade para refletir e crescer.",
      link: "https://blog.facens.br/filme-ted-talk-o-perigo-de-uma-historia-unica-por-chimamanda-ngozi-adichie/",
    },
    raiva: {
      message:
        "Raiva pode ser canalizada para mudanças positivas. Use sua energia para construir algo incrível!",
      link: "https://youtu.be/aPT-BjeyX6U?si=B3yYesomiyj3YivE",
    },
    tristeza: {
      message:
        "Tudo bem sentir tristeza. Cuide-se e lembre-se de que dias melhores estão por vir.",
      link: "https://youtu.be/l2AJdmNtZd8?si=CbiOmYrmXZVGTPWG",
    },
  };

  const motivationalMessage =
    categoryRecommendations[predominantCategory].message;
  const recommendationLink = categoryRecommendations[predominantCategory].link;

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
        <p style="font-size: 16px; color: #333;">Categoria Predominante: <strong>${predominantCategory}</strong></p>
      </div>
      <div style="margin: 20px 0; padding: 20px; background-color: #fff; border-radius: 8px; text-align: center;">
        <p style="font-size: 18px; color: #333;"><strong>Mensagem Motivacional:</strong></p>
        <p style="font-size: 16px; color: #555;">${motivationalMessage}</p>
      </div>
      <div style="margin: 20px 0; text-align: center;">
        <a href="${recommendationLink}" target="_blank" style="font-size: 16px; color: #1DA1F2; text-decoration: none;">
          Clique aqui para acessar uma recomendação baseada nos seus sentimentos.
        </a>
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

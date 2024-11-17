import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  console.log("data:", data);

  if (!data) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    // Reestruturando os dados para o formato esperado
    const formattedData = {
      email: data.email,
      answers: {
        Atenção: data.answers[0]["Atenção"],
        Confiança: data.answers[0]["Confiança"],
        Liderança: data.answers[0]["Liderança"],
        Comunicação: data.answers[0]["Comunicação"],
      },
      twitterData: data.twitterData
        ? {
            bot: data.twitterData.bot,
            category: data.twitterData.category,
            creation_date: data.twitterData.creation_date,
            default_profile: data.twitterData.default_profile,
            default_profile_image: data.twitterData.default_profile_image,
            description: data.twitterData.description,
            external_url: data.twitterData.external_url,
            favourites_count: data.twitterData.favourites_count,
            follower_count: data.twitterData.follower_count,
            following_count: data.twitterData.following_count,
            has_nft_avatar: data.twitterData.has_nft_avatar,
            is_blue_verified: data.twitterData.is_blue_verified,
            is_private: data.twitterData.is_private,
            is_verified: data.twitterData.is_verified,
            listed_count: data.twitterData.listed_count,
            location: data.twitterData.location,
            name: data.twitterData.name,
            number_of_tweets: data.twitterData.number_of_tweets,
            profile_banner_url: data.twitterData.profile_banner_url,
            profile_pic_url: data.twitterData.profile_pic_url,
            timestamp: data.twitterData.timestamp,
            user_id: data.twitterData.user_id,
            username: data.twitterData.username,
            verified_type: data.twitterData.verified_type,
          }
        : null, // Caso `twitterData` não esteja presente, definimos como `null`
    };

    // Fazendo a requisição para a API externa
    const response = await axios.post(
      `${process.env.API_PYTHON}`,
      formattedData
    );

    // Retornando os dados recebidos para o cliente
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar dados da API externa:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados da API externa" },
      { status: 500 }
    );
  }
}

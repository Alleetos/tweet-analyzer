// app/api/twitterUser/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username é obrigatório." },
      { status: 400 }
    );
  }

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "twitter154.p.rapidapi.com",
      "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
    },
  };

  try {
    const response = await fetch(
      `https://twitter154.p.rapidapi.com/user/details?username=${username}`,
      options
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Usuário não encontrado." },
        { status: response.status }
      );
    }

    const userData = await response.json();

    // Verificar se a resposta contém dados de usuário válidos
    if (!userData || !userData.username) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Erro ao consultar API do Twitter:", error);
    return NextResponse.json(
      { error: "Erro ao verificar usuário." },
      { status: 500 }
    );
  }
}

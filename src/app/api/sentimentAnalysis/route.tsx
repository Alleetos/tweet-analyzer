import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    // Fazendo a requisição para a API externa
    const response = await axios.post(`${process.env.API_PYTHON}`, {
      username,
    });

    // Retornando os dados recebidos para o cliente
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar tweets:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados da API externa" },
      { status: 500 }
    );
  }
}

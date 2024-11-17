import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";

export async function GET(req: Request) {
  // Conecta ao banco de dados
  await dbConnect();

  // Aqui você pode adicionar operações no banco de dados usando Mongoose

  return NextResponse.json(
    { error: "Conexão com o MongoDB bem-sucedida!" },
    { status: 200 }
  );
}

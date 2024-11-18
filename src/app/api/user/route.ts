import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import sgMail from "@sendgrid/mail";
import { resultsTemplate } from "@/utils/templates/resultsTemplate";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function GET(req: Request) {
  await dbConnect();

  const url = new URL(req.url);
  const email = url.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "E-mail não fornecido" },
      { status: 400 }
    );
  }

  try {
    if (email === process.env.NEXT_PUBLIC_ADM_EMAIL) {
      const users = await User.find({}).sort({ updatedAt: -1 }); // -1 para ordem decrescente

      return NextResponse.json(
        {
          exists: true,
          data: users,
        },
        { status: 200 }
      );
    } else {
      // Busca um único usuário pelo e-mail, ordenado por updatedAt
      const user = await User.findOne({ email }).sort({ updatedAt: -1 });

      if (user) {
        return NextResponse.json(
          {
            exists: true,
            data: user,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json({ exists: false }, { status: 200 });
      }
    }
  } catch (error) {
    console.error("Erro ao verificar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao verificar usuário" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    // Extrair dados do corpo da requisição
    const { email, answers, twitterData, results } = await req.json();

    // Verificar se o email foi fornecido
    if (!email) {
      return NextResponse.json(
        { error: "O campo 'email' é obrigatório." },
        { status: 400 }
      );
    }

    // Atualizar o registro mais recente ou criar um novo
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Busca pelo email
      {
        $set: {
          ...(twitterData && { twitterData }),
          ...(results && { results }),
        },
        $push: {
          answers: answers || {}, // Mescla as novas respostas no campo answers
        },
      },
      {
        new: true, // Retorna o documento atualizado
        upsert: true, // Cria um novo documento se não existir
        sort: { updatedAt: -1 }, // Ordena por updatedAt para garantir o registro mais recente
      }
    );

    // Determinar os tempos para validar o envio do e-mail
    const createdAt = new Date(updatedUser.createdAt).getTime();
    const updatedAt = new Date(updatedUser.updatedAt).getTime();
    const now = Date.now();

    const isNewUser = now - createdAt <= 2 * 60 * 1000;
    const isRecentUpdate = now - updatedAt <= 2 * 60 * 1000;

    if (results && (isNewUser || isRecentUpdate)) {
      const msg = {
        to: email,
        from: process.env.SENDGRID_SENDER_EMAIL || "",
        subject: "Feedback de Sentimento - Resultados Disponíveis",
        html: resultsTemplate(results),
      };

      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
      }
    }

    return NextResponse.json(
      {
        message:
          updatedUser.createdAt === updatedUser.updatedAt
            ? "Novo usuário criado com sucesso"
            : "Dados do usuário atualizados com sucesso",
      },
      { status: updatedUser.createdAt === updatedUser.updatedAt ? 201 : 200 }
    );
  } catch (error) {
    console.error("Erro ao salvar dados do usuário:", error);
    return NextResponse.json(
      { error: "Falha ao salvar dados do usuário" },
      { status: 500 }
    );
  }
}

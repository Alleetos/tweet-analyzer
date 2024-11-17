// app/api/auth/createConfirmationCode/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Confirmation from "@/models/confirmation";
import sgMail from "@sendgrid/mail";
import { generateConfirmationEmailTemplate } from "../../../utils/templates/confirmationEmail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email } = await req.json();
    console.log("email:", email);
    const confirmationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Expira em 5 minutos

    const newConfirmation = new Confirmation({
      email,
      confirmationCode,
      expiresAt,
      verified: false,
    });

    await newConfirmation.save();

    // Configurar e enviar o email com o template personalizado
    const msg = {
      to: email,
      from: process.env.SENDGRID_SENDER_EMAIL || "",
      subject: "Código de Confirmação - Tweet Analyzer",
      html: generateConfirmationEmailTemplate(confirmationCode),
    };

    await sgMail.send(msg);

    return NextResponse.json(
      { message: "Código de confirmação criado e enviado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao criar e enviar código de confirmação:", error);
    return NextResponse.json(
      { error: "Falha ao criar e enviar o código de confirmação" },
      { status: 500 }
    );
  }
}

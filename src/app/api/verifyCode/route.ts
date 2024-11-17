// app/api/auth/verifyCode/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Confirmation from "@/models/confirmation";

export async function POST(req: Request) {
  await dbConnect();

  const { email, confirmationCode } = await req.json();
  const record = await Confirmation.findOne({
    email,
    confirmationCode,
    verified: false,
  });

  if (!record) {
    return NextResponse.json({ error: "Código incorreto." }, { status: 400 });
  }

  // Marcar como verificado
  record.verified = true;
  await record.save();

  return NextResponse.json({ message: "Código verificado com sucesso." });
}

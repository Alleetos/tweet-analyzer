// models/Confirmation.ts
import mongoose, { Document, Model } from "mongoose";

interface IConfirmation extends Document {
  email: string;
  confirmationCode: string;
  createdAt: Date;
  expiresAt: Date;
  verified: boolean;
}

const confirmationSchema = new mongoose.Schema<IConfirmation>({
  email: { type: String, required: true },
  confirmationCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  verified: { type: Boolean, default: false },
});

// Índice TTL para expirar automaticamente documentos antigos
confirmationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Confirmation: Model<IConfirmation> =
  mongoose.models.Confirmation ||
  mongoose.model<IConfirmation>("Confirmation", confirmationSchema);

export default Confirmation;

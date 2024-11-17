import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  twitterData?: object;
  results?: object;
  answers?: object;
  createdAt: Date; // Campo gerado automaticamente por `timestamps: true`
  updatedAt: Date; // Campo gerado automaticamente por `timestamps: true`
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true },
    twitterData: { type: Object },
    results: { type: Object },
    answers: { type: Object, default: {} },
  },
  {
    timestamps: true, // Gera automaticamente os campos `createdAt` e `updatedAt`
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;

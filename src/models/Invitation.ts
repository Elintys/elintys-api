// models/Invitation.ts
import { Schema, model, Document, Types } from "mongoose";

/**
 * Interface TypeScript représentant une invitation à un événement.
 */
export interface IInvitation extends Document {
  event: Types.ObjectId;                // Référence vers l'événement concerné
  guest?: Types.ObjectId;               // Référence vers l'utilisateur invité (optionnelle)
  fullName: string;                     // Nom complet de l'invité
  email?: string;                       // Email de l'invité
  message?: string;                     // Message personnalisé
  isCouple: boolean;                    // Invitation pour deux personnes ou non
  status: "pending" | "confirmed" | "cancelled"; // Statut global de l'invitation
  scanStatus: "not_scanned" | "present" | "absent"; // Statut du scan à l’entrée
  sentAt: Date;                         // Date d’envoi de l’invitation
}

const InvitationSchema = new Schema<IInvitation>(
  {
    event: { type: Schema.Types.ObjectId, ref: "Event", required: false },
    guest: { type: Schema.Types.ObjectId, ref: "User" },
    fullName: { type: String, required: false, trim: true },
    email: { type: String, trim: true },
    message: { type: String, default: "" },
    isCouple: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    scanStatus: {
      type: String,
      enum: ["not_scanned", "present", "absent"],
      default: "not_scanned",
    },

    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<IInvitation>("Invitation", InvitationSchema);

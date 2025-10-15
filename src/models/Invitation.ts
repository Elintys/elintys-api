import { Schema, model, Types, Document } from "mongoose";

export interface IInvitation extends Document {
  event: Types.ObjectId;
  sender: Types.ObjectId;
  recipientEmail: string;
  status: "pending" | "accepted" | "declined";
  sentAt: Date;
}

const InvitationSchema = new Schema<IInvitation>(
  {
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipientEmail: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["pending", "accepted", "declined"], 
      default: "pending" 
    },
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<IInvitation>("Invitation", InvitationSchema);

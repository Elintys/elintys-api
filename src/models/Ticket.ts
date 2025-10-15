import { Schema, model, Types, Document } from "mongoose";

export interface ITicket extends Document {
  event: Types.ObjectId;
  user: Types.ObjectId;
  qrCode?: string;
  status: "valid" | "used" | "cancelled";
  issuedAt: Date;
}

const TicketSchema = new Schema<ITicket>(
  {
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    user:  { type: Schema.Types.ObjectId, ref: "User", required: true },
    qrCode: { type: String },
    status: { 
      type: String, 
      enum: ["valid", "used", "cancelled"], 
      default: "valid" 
    },
    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<ITicket>("Ticket", TicketSchema);

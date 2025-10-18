import { Schema, model, Types, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description?: string;
  organizer: Types.ObjectId;
  organization?: Types.ObjectId;
  venue?: Types.ObjectId;
  category?: string;
  startDate: Date;
  endDate: Date;
  isPublic: boolean;
  tickets: Types.ObjectId[];
  staff: Types.ObjectId[];
  externalSource?: Types.ObjectId;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String },
    organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    organization: { type: Schema.Types.ObjectId, ref: "Organization" },
    venue: { type: Schema.Types.ObjectId, ref: "Venue", required: true },
    category: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isPublic: { type: Boolean, default: true },
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
    staff: [{ type: Schema.Types.ObjectId, ref: "User" }],
    externalSource: { type: Schema.Types.ObjectId, ref: "ExternalEventSource" },
  },
  { timestamps: true }
);

export default model<IEvent>("Event", EventSchema);

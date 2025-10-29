import { model, Schema } from "mongoose";
import { IEvent } from "./interfaces/IEvent";



const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String },
    organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    organization: { type: Schema.Types.ObjectId, ref: "Organization" },
    venue: { type: Schema.Types.ObjectId, ref: "Venue", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
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

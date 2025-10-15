import { Schema, model, Document } from "mongoose";

export interface IExternalEventSource extends Document {
  provider: "Eventbrite" | "Meetup" | "Other";
  externalId: string;
  rawData: any;
}

const ExternalEventSourceSchema = new Schema<IExternalEventSource>(
  {
    provider: { 
      type: String, 
      enum: ["Eventbrite", "Meetup", "Other"], 
      required: true 
    },
    externalId: { type: String, required: true },
    rawData: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default model<IExternalEventSource>("ExternalEventSource", ExternalEventSourceSchema);

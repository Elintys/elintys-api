import { Schema, model, Document } from "mongoose";

export interface IVenue extends Document {
  name: string;
  address: string;
  city?: string;
  country?: string;
  capacity?: number;
  contactInfo?: string;
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
}

const VenueSchema = new Schema<IVenue>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String },
    country: { type: String },
    capacity: { type: Number },
    contactInfo: { type: String },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: [Number],
    },
  },
  { timestamps: true }
);

VenueSchema.index({ location: "2dsphere" });

export default model<IVenue>("Venue", VenueSchema);

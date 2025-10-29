import { Document, Types } from "mongoose";

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
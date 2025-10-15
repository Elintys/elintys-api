import { Schema, model, Types, Document } from "mongoose";

export interface IOrganization extends Document {
  name: string;
  logoUrl?: string;
  description?: string;
  owner: Types.ObjectId;
  members: Types.ObjectId[];
  events: Types.ObjectId[];
}

const OrganizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true },
    logoUrl: { type: String },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Types.ObjectId, ref: "User" }],
    events: [{ type: Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

export default model<IOrganization>("Organization", OrganizationSchema);

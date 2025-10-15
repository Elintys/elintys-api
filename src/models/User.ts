import { Schema, model, Types, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl?: string;
  role: "user" | "organizer" | "staff" | "admin";
  organizations: Schema.Types.ObjectId[];
  createdEvents: Schema.Types.ObjectId[];
  tickets: Schema.Types.ObjectId[];
  notifications: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true },
    avatarUrl: { type: String },
    role: { 
      type: String, 
      enum: ["user", "organizer", "staff", "admin"], 
      default: "user" 
    },
    organizations: [{ type: Schema.Types.ObjectId, ref: "Organization" }],
    createdEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);

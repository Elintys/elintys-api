import { Document, model, Schema } from "mongoose";

/**
 * Interface utilisateur MongoDB
 * 
 * Remarque :
 * - Le champ `firebaseUid` permet d’associer un utilisateur MongoDB
 *   à son compte Firebase Auth.
 * - Le mot de passe n’est plus stocké côté MongoDB (Firebase le gère).
 */
export interface IUser extends Document {
  firebaseUid: string; // UID unique venant de Firebase Auth
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  role: "user" | "organizer" | "staff" | "admin";
  organizations: Schema.Types.ObjectId[];
  createdEvents: Schema.Types.ObjectId[];
  tickets: Schema.Types.ObjectId[];
  notifications: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true, // chaque compte Firebase correspond à un user Mongo
    },
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
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

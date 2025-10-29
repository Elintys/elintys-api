// models/Category.ts
import { Schema, model, Document } from "mongoose";
import { ICategory } from "./interfaces/ICategory";



const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    color: { type: String, default: "#000000" },
    icon: { type: String, default: "tag" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<ICategory>("Category", CategorySchema);

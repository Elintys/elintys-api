import { Document } from "mongoose";

/**
 * Interface TypeScript représentant une catégorie d'événement
 */
export interface ICategory extends Document {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  isActive: boolean;
}
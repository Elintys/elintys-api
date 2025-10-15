import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Fonction pour se connecter à MongoDB
 */
export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.DATABASE_URL as string;

    if (!mongoURI) {
      throw new Error('DATABASE_URL non défini dans le fichier .env');
    }

    await mongoose.connect(mongoURI);
    console.log('Connecté à MongoDB avec succès !');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error);
    process.exit(1); // Arrête le serveur si la connexion échoue
  }
};

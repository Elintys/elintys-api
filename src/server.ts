import app from './app';
import { connectDB } from './config/db.config';

const PORT = process.env.PORT || 3000;

// Démarrer le serveur après connexion à la DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
});

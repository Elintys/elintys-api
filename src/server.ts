import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import app from './app';
import { connectDB } from './config/db.config';

import path from "path";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;


/**
 * Configuration OpenAPI (Swagger)
 * utilisée par swagger-jsdoc et swagger-ui-express
 */
export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Elintys API",
      version: "1.0.0",
      description:
        "Documentation interactive de l'API Elintys — Gestion des événements, utilisateurs, tickets et notifications.",
      contact: {
        name: "Équipe Elintys",
        email: "support@elintys.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Serveur local de développement",
      },
    ],
    /**
     * Configuration de sécurité globale
     * Permet d’utiliser un token Firebase dans Swagger UI
     */
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Ajoutez ici votre token Firebase. Exemple : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Dossiers où Swagger cherche les annotations
  apis: [path.join(__dirname, "./routes/*.ts")],
};


// Génération de la documentation
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Nouvelle route pour exporter le JSON brut
app.get("/api/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocs);
});

console.log(" Documentation disponible sur : http://localhost:3000/api/docs");

// Démarrer le serveur après connexion à la DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
});

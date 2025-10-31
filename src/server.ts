import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import app from "./app";
import { connectDB } from "./config/db.config";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Détection de l'environnement Render
const isProduction = process.env.NODE_ENV === "production";

// Détermination dynamique du domaine
const SERVER_URL = isProduction
  ? process.env.RENDER_EXTERNAL_URL || `https://elintys-api.onrender.com`
  : `http://localhost:${PORT}`;

/**
 * Configuration OpenAPI (Swagger)
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
        url: SERVER_URL,
        description: isProduction
          ? "Serveur de production (Render)"
          : "Serveur local de développement",
      },
    ],
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
  apis: [path.join(__dirname, "./routes/*.js")], 
};

// Génération de la documentation Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/api/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocs);
});

console.log(`Documentation Swagger chargée : ${SERVER_URL}/api/docs`);

// Connexion DB + démarrage du serveur
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Serveur lancé sur ${SERVER_URL}`);
  });
});

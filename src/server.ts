import app from './app';
import { connectDB } from './config/db.config';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import path from "path";

const PORT = process.env.PORT || 3000;

// Options de génération OpenAPI
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Elyntis API",
      version: "1.0.0",
      description: "Documentation interactive de l'API Elintys",
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: "Serveur local" },
    ],
  },
  apis: [path.join(__dirname, "./routes/*.ts")], // <--- où Swagger cherche les annotations
};


// Génération de la documentation
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



console.log(" Documentation disponible sur : http://localhost:5000/api/docs");

// Démarrer le serveur après connexion à la DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
});

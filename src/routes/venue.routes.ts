// routes/venueRoutes.ts
import { Router } from "express";
import {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
} from "../controllers/venue.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Venues
 *   description: Gestion des lieux d'événements (salles, espaces, etc.)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Venue:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - capacity
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique du lieu
 *           example: "670b1f12abcde9012f5d1111"
 *         name:
 *           type: string
 *           example: "Espace Lumière"
 *         address:
 *           type: string
 *           example: "120 Rue Sainte-Catherine, Montréal, QC"
 *         capacity:
 *           type: number
 *           example: 250
 *         type:
 *           type: string
 *           example: "Salle de conférence"
 *         description:
 *           type: string
 *           example: "Salle moderne équipée d’un système audio-visuel complet"
 *         imageUrl:
 *           type: string
 *           example: "https://elyntis.s3.ca-central-1.amazonaws.com/venue1.jpg"
 */

/**
 * @swagger
 * /api/venues:
 *   get:
 *     summary: Récupère tous les lieux disponibles
 *     tags: [Venues]
 *     responses:
 *       200:
 *         description: Liste de tous les lieux
 *   post:
 *     summary: Crée un nouveau lieu
 *     tags: [Venues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venue'
 *     responses:
 *       201:
 *         description: Lieu créé avec succès
 */

/**
 * @swagger
 * /api/venues/{id}:
 *   get:
 *     summary: Récupère un lieu par ID
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du lieu
 *     responses:
 *       200:
 *         description: Détails du lieu
 *   put:
 *     summary: Met à jour un lieu existant
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du lieu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venue'
 *     responses:
 *       200:
 *         description: Lieu mis à jour avec succès
 *       404:
 *         description: Lieu non trouvé
 *   delete:
 *     summary: Supprime un lieu
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du lieu
 *     responses:
 *       204:
 *         description: Lieu supprimé avec succès
 *       404:
 *         description: Lieu non trouvé
 */


// Définition des routes CRUD
router.get("/", getAllVenues);       // GET /api/venues
router.get("/:id", getVenueById);    // GET /api/venues/:id
router.post("/", createVenue);       // POST /api/venues
router.put("/:id", updateVenue);     // PUT /api/venues/:id
router.delete("/:id", deleteVenue);  // DELETE /api/venues/:id

export default router;

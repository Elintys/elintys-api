// routes/eventRoutes.ts
import { Router } from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Gestion des événements Elyntis / GuestPass
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - organizer
 *         - startDate
 *         - endDate
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique de l'événement
 *           example: "670b1f12abcde9012f5d1234"
 *         title:
 *           type: string
 *           description: Titre de l'événement
 *           example: "Gala des Entrepreneurs 2025"
 *         description:
 *           type: string
 *           description: Brève description de l'événement
 *           example: "Célébration annuelle des jeunes entrepreneurs"
 *         organizer:
 *           type: string
 *           description: ID de l’utilisateur organisateur
 *           example: "66ff14ed98a9a8e21300afc4"
 *         organization:
 *           type: string
 *           description: ID de l'organisation liée
 *           example: "670b1f12abcde9012f5d5678"
 *         venue:
 *           type: string
 *           description: ID du lieu de l'événement
 *           example: "670b1f12abcde9012f5d9876"
 *         category:
 *           type: string
 *           example: "Business"
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2025-03-15T18:00:00.000Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2025-03-15T23:00:00.000Z"
 *         isPublic:
 *           type: boolean
 *           example: true
 *         tickets:
 *           type: array
 *           items:
 *             type: string
 *           example: ["671a2c1d0000000000000123"]
 *         staff:
 *           type: array
 *           items:
 *             type: string
 *           example: ["671a2c1d0000000000000987"]
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Liste tous les événements
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Liste complète des événements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *
 *   post:
 *     summary: Créer un nouvel événement
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *           example:
 *             title: "TechNova Expo 2025"
 *             description: "Salon de la technologie et de l’innovation"
 *             organizer: "66ff14ed98a9a8e21300afc4"
 *             startDate: "2025-05-20T09:00:00.000Z"
 *             endDate: "2025-05-20T18:00:00.000Z"
 *             category: "Tech"
 *             isPublic: true
 *     responses:
 *       201:
 *         description: Événement créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Données manquantes ou invalides
 */

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Récupère un événement par ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'événement
 *     responses:
 *       200:
 *         description: Détails de l'événement
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Événement non trouvé
 *
 *   put:
 *     summary: Met à jour un événement existant
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'événement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Événement mis à jour avec succès
 *       404:
 *         description: Événement introuvable
 *
 *   delete:
 *     summary: Supprime un événement
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Événement supprimé avec succès
 *       404:
 *         description: Événement non trouvé
 */


// CRUD complet
router.get("/", getAllEvents);       // GET /api/events
router.get("/:id", getEventById);    // GET /api/events/:id
router.post("/", createEvent);       // POST /api/events
router.put("/:id", updateEvent);     // PUT /api/events/:id
router.delete("/:id", deleteEvent);  // DELETE /api/events/:id

export default router;

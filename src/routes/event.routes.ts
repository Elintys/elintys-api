import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getEventsByUser,
  getEventsByCategory,
  updateEvent,
} from "../controllers/event.controller";
import { verifyFirebaseToken } from "../middlewares/authMiddleware";
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
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
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
 *         description:
 *           type: string
 *           description: Brève description de l'événement
 *         organizer:
 *           type: string
 *           description: ID de l’utilisateur organisateur
 *         organization:
 *           type: string
 *           description: ID de l'organisation liée
 *         venue:
 *           type: string
 *           description: ID du lieu de l'événement
 *         category:
 *           type: string
 *           example: "Business"
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         isPublic:
 *           type: boolean
 *         tickets:
 *           type: array
 *           items:
 *             type: string
 *         staff:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Liste tous les événements
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste complète des événements
 *   post:
 *     summary: Créer un nouvel événement
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Événement créé avec succès
 */

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Récupère un événement par ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *   put:
 *     summary: Met à jour un événement existant
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Supprime un événement
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/user/{userId}:
 *   get:
 *     summary: Récupère tous les événements créés par un utilisateur
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur (organisateur)
 *     responses:
 *       200:
 *         description: Liste des événements de l'utilisateur
 */

/**
 * @swagger
 * /api/events/category/{categoryId}:
 *   get:
 *     summary: Récupère tous les événements d'une catégorie donnée
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Liste des événements appartenant à la catégorie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       404:
 *         description: Aucune donnée trouvée
 */


// router.use(verifyFirebaseToken); // Toutes les routes ci-dessous nécessitent une authentification

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.get("/user/:userId", verifyFirebaseToken, getEventsByUser);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.get("/category/:categoryId", getEventsByCategory);

export default router;

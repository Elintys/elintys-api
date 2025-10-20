import express from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket
} from "../controllers/ticket.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Gestion des tickets (billets) d’accès aux événements
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       required:
 *         - event
 *         - owner
 *         - type
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *         event:
 *           type: string
 *           description: ID de l’événement concerné
 *         owner:
 *           type: string
 *           description: ID de l’utilisateur détenteur
 *         type:
 *           type: string
 *           enum: [standard, vip, premium]
 *         price:
 *           type: number
 *           example: 50
 *         qrCode:
 *           type: string
 *           example: "QR_ABC123XYZ"
 *         status:
 *           type: string
 *           enum: [active, used, cancelled]
 *           example: "active"
 */

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Liste tous les tickets
 *     tags: [Tickets]
 *   post:
 *     summary: Crée un ticket pour un utilisateur
 *     tags: [Tickets]
 *
 * /api/tickets/{id}:
 *   get:
 *     summary: Détails d’un ticket
 *     tags: [Tickets]
 *   put:
 *     summary: Met à jour un ticket existant
 *     tags: [Tickets]
 *   delete:
 *     summary: Supprime un ticket
 *     tags: [Tickets]
 */


router.post("/", createTicket);
router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

export default router;

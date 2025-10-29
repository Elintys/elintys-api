import { Router } from "express";
import {
  createInvitation,
  getAllInvitations,
  getGuestsByEvent,
  updateInvitation,
  deleteInvitation,
} from "../controllers/invitation.controller";
import { verifyFirebaseToken } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Invitations
 *   description: Gestion des invitations et des invités liés aux événements
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Invitation:
 *       type: object
 *       required:
 *         - event
 *         - fullName
 *       properties:
 *         _id:
 *           type: string
 *           example: "671a3c1f0000000000000789"
 *         event:
 *           type: string
 *           example: "671a3c1f0000000000000210"
 *         guest:
 *           type: string
 *           example: "671a3c1f0000000000000456"
 *         fullName:
 *           type: string
 *           example: "Jean Dupont"
 *         email:
 *           type: string
 *           example: "jean.dupont@example.com"
 *         message:
 *           type: string
 *           example: "Vous êtes cordialement invité à notre gala annuel."
 *         isCouple:
 *           type: boolean
 *           example: true
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *           example: "confirmed"
 *         scanStatus:
 *           type: string
 *           enum: [not_scanned, present, absent]
 *           example: "present"
 *         sentAt:
 *           type: string
 *           format: date-time
 *           example: "2025-11-01T18:30:00.000Z"
 */

// router.use(verifyFirebaseToken);

/**
 * @swagger
 * /api/invitations:
 *   get:
 *     summary: Liste toutes les invitations
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste complète des invitations
 *   post:
 *     summary: Créer une nouvelle invitation
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invitation'
 *     responses:
 *       201:
 *         description: Invitation créée avec succès
 */
router.get("/", getAllInvitations);
router.post("/", createInvitation);

/**
 * @swagger
 * /api/invitations/event/{eventId}:
 *   get:
 *     summary: Récupère toutes les invitations pour un événement donné
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'événement
 *     responses:
 *       200:
 *         description: Liste des invités associés à l'événement
 */
router.get("/event/:eventId", getGuestsByEvent);

/**
 * @swagger
 * /api/invitations/{id}:
 *   put:
 *     summary: Met à jour une invitation
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Supprime une invitation
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", updateInvitation);
router.delete("/:id", deleteInvitation);

export default router;

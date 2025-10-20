import express from "express";
import {
  createInvitation,
  getAllInvitations,
  getInvitationsByEvent,
  updateInvitationStatus,
  deleteInvitation
} from "../controllers/invitation.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Invitations
 *   description: Gestion des invitations à des événements
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Invitation:
 *       type: object
 *       required:
 *         - event
 *         - sender
 *         - recipientEmail
 *       properties:
 *         _id:
 *           type: string
 *         event:
 *           type: string
 *           example: "670b1f12abcde9012f5d3333"
 *         sender:
 *           type: string
 *           example: "670b1f12abcde9012f5d2222"
 *         recipientEmail:
 *           type: string
 *           example: "invitee@example.com"
 *         status:
 *           type: string
 *           enum: [pending, accepted, declined]
 *           example: "pending"
 *         sentAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/invitations:
 *   get:
 *     summary: Récupère toutes les invitations
 *     tags: [Invitations]
 *     responses:
 *       200:
 *         description: Détails de l'événement
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invitation'
 *       404:
 *         description: Événement non trouvé
 *   post:
 *     summary: Crée une invitation
 *     tags: [Invitations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invitation'
 *     responses:
 *       201:
 *         description: Invitation créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invitation'
 *       400:
 *         description: Requête invalide
 *
 * /api/invitations/event/{eventId}:
 *   get:
 *     summary: Récupère les invitations liées à un événement
 *     tags: [Invitations]
 *     parameters:
 *      - in: path
 *        name: eventId
 *        required: true
 *        description: ID de l'événement
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Détails de l'événement
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invitation'
 *       404:
 *         description: Invitation non trouvé
 *
 * /api/invitations/{id}:
 *   patch:
 *     summary: Met à jour le statut d’une invitation (acceptée, refusée, etc.)
 *     tags: [Invitations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'invitation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invitation mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invitation'
 *       404:
 *         description: Invitation non trouvée
 *
 *   delete:
 *     summary: Supprime une invitation
 *     tags: [Invitations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'invitation
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Invitation supprimée avec succès
 *       404:
 *         description: Invitation non trouvée
 */


router.post("/", createInvitation);
router.get("/", getAllInvitations);
router.get("/event/:eventId", getInvitationsByEvent);
router.patch("/:id", updateInvitationStatus);
router.delete("/:id", deleteInvitation);

export default router;

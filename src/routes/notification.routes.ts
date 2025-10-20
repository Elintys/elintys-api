import express from "express";
import {
  createNotification,
  getAllNotifications,
  getNotificationsByUser,
  markNotificationAsRead,
  deleteNotification
} from "../controllers/notification.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Gestion des notifications utilisateurs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - user
 *         - title
 *         - message
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *           description: ID de l’utilisateur destinataire
 *         title:
 *           type: string
 *           example: "Nouvelle invitation reçue"
 *         message:
 *           type: string
 *           example: "Vous avez été invité à l’événement TechNova 2025."
 *         type:
 *           type: string
 *           example: "event"
 *         read:
 *           type: boolean
 *           example: false
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Récupère toutes les notifications
 *     tags: [Notifications]
 *   post:
 *     summary: Crée une notification
 *     tags: [Notifications]
 *
 * /api/notifications/user/{userId}:
 *   get:
 *     summary: Récupère les notifications d’un utilisateur
 *     tags: [Notifications]
 *
 * /api/notifications/{id}/read:
 *   patch:
 *     summary: Marque une notification comme lue
 *     tags: [Notifications]
 *
 * /api/notifications/{id}:
 *   delete:
 *     summary: Supprime une notification
 *     tags: [Notifications]
 */


// Routes CRUD pour notifications
router.post("/", createNotification);
router.get("/", getAllNotifications);
router.get("/user/:userId", getNotificationsByUser);
router.patch("/:id/read", markNotificationAsRead);
router.delete("/:id", deleteNotification);

export default router;

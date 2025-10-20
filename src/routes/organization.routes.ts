import express from "express";
import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
} from "../controllers/organization.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Gestion des organisations partenaires ou organisatrices
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       required:
 *         - name
 *         - owner
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *           example: "Nova Événementiel"
 *         logoUrl:
 *           type: string
 *           example: "https://elyntis.s3.ca-central-1.amazonaws.com/logos/nova.png"
 *         description:
 *           type: string
 *           example: "Agence de planification d’événements à Montréal"
 *         owner:
 *           type: string
 *           description: ID du propriétaire (utilisateur)
 *         members:
 *           type: array
 *           items:
 *             type: string
 *         events:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /api/organizations:
 *   get:
 *     summary: Récupère toutes les organisations
 *     tags: [Organizations]
 *   post:
 *     summary: Crée une nouvelle organisation
 *     tags: [Organizations]
 */

/**
 * @swagger
 * /api/organizations/{id}:
 *   get:
 *     summary: Détails d’une organisation
 *     tags: [Organizations]
 *   put:
 *     summary: Met à jour une organisation
 *     tags: [Organizations]
 *   delete:
 *     summary: Supprime une organisation
 *     tags: [Organizations]
 */


router.post("/", createOrganization);
router.get("/", getAllOrganizations);
router.get("/:id", getOrganizationById);
router.put("/:id", updateOrganization);
router.delete("/:id", deleteOrganization);

export default router;

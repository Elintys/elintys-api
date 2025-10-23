// routes/categoryRoutes.ts
import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { verifyFirebaseToken } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestion des catégories d'événements
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           example: "671a8b5e0000000000000101"
 *         name:
 *           type: string
 *           example: "Business"
 *         description:
 *           type: string
 *           example: "Événements liés à l’entrepreneuriat et au commerce"
 *         color:
 *           type: string
 *           example: "#1E90FF"
 *         icon:
 *           type: string
 *           example: "briefcase"
 *         isActive:
 *           type: boolean
 *           example: true
 */

router.use(verifyFirebaseToken);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Liste toutes les catégories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste complète des catégories
 *   post:
 *     summary: Créer une nouvelle catégorie
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 */
router.get("/", getAllCategories);
router.post("/", createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Récupère une catégorie par ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *   put:
 *     summary: Met à jour une catégorie
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Supprime une catégorie
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;

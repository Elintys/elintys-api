import { Router } from "express";
import {
  verifyFirebaseToken,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs Elyntis / GuestPass
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firebaseUid
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique de l'utilisateur dans MongoDB
 *           example: "670b1f12abcde9012f5d1234"
 *         firebaseUid:
 *           type: string
 *           description: ID unique provenant de Firebase Authentication
 *           example: "WxYzAbC1234"
 *         firstName:
 *           type: string
 *           description: Prénom de l'utilisateur
 *           example: "Klan"
 *         lastName:
 *           type: string
 *           description: Nom de famille de l'utilisateur
 *           example: "Saah"
 *         email:
 *           type: string
 *           description: Adresse email unique de l'utilisateur
 *           example: "klan@elyntis.com"
 *         avatarUrl:
 *           type: string
 *           description: URL de la photo de profil
 *           example: "https://randomuser.me/api/portraits/men/21.jpg"
 *         role:
 *           type: string
 *           enum: [user, organizer, staff, admin]
 *           description: Rôle attribué à l'utilisateur
 *           example: "organizer"
 *         organizations:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste des ID des organisations auxquelles l'utilisateur appartient
 *           example: ["671a2c1d0000000000000123"]
 *         createdEvents:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste des ID des événements créés par l'utilisateur
 *           example: ["671a2c1d0000000000000456"]
 *         tickets:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste des tickets appartenant à l'utilisateur
 *           example: ["671a2c1d0000000000000789"]
 *         notifications:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste des notifications reçues par l'utilisateur
 *           example: ["671a2c1d0000000000000999"]
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Liste tous les utilisateurs (protégé)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste complète des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 *   post:
 *     summary: Crée un nouvel utilisateur lié à Firebase (protégé)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               avatarUrl:
 *                 type: string
 *             example:
 *               firstName: "John"
 *               lastName: "Doe"
 *               email: "john.doe@elyntis.com"
 *               avatarUrl: "https://randomuser.me/api/portraits/men/21.jpg"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par ID (protégé)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur MongoDB
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Utilisateur introuvable
 *
 *   put:
 *     summary: Met à jour un utilisateur existant (protégé)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Utilisateur introuvable
 *
 *   delete:
 *     summary: Supprime un utilisateur (protégé)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Utilisateur introuvable
 */

// Routes protégées
router.get("/", verifyFirebaseToken, getAllUsers);
router.get("/:id", verifyFirebaseToken, getUserById);
router.post("/", verifyFirebaseToken, createUser);
router.put("/:id", verifyFirebaseToken, updateUser);
router.delete("/:id", verifyFirebaseToken, deleteUser);

export default router;

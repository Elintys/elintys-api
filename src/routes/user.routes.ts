import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/user.controller';

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
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique de l'utilisateur
 *           example: "670b1f12abcde9012f5d1234"
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
 *         password:
 *           type: string
 *           description: Mot de passe haché de l'utilisateur
 *           example: "$2a$10$ABCDEFGH123456789"
 *         avatarUrl:
 *           type: string
 *           description: URL de l'avatar de profil
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
 *           description: Liste des ID de tickets appartenant à l'utilisateur
 *           example: ["671a2c1d0000000000000789"]
 *         notifications:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste des ID de notifications reçues par l'utilisateur
 *           example: ["671a2c1d0000000000000999"]
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Liste tous les utilisateurs
 *     tags: [Users]
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
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             firstName: "Klan"
 *             lastName: "Saah"
 *             email: "klan@elyntis.com"
 *             password: "MotDePasseSécurisé123"
 *             role: "organizer"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides ou email déjà utilisé
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
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
 *     summary: Met à jour un utilisateur existant
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       404:
 *         description: Utilisateur introuvable
 *
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur introuvable
 */


// Routes disponibles
router.get('/', getAllUsers);
router.post('/', createUser);

export default router;

import { Router } from "express";
import {
  registerUser,
  loginUser,
  updateProfile,
  recoverPassword,
} from "../controllers/auth.controller";
import { verifyFirebaseToken } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification via Firebase et MongoDB
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Crée un nouvel utilisateur à partir d'un compte Firebase
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Klan"
 *               lastName:
 *                 type: string
 *                 example: "Saah"
 *               email:
 *                 type: string
 *                 example: "klan@elyntis.com"
 *               avatarUrl:
 *                 type: string
 *                 example: "https://elyntis.com/avatars/klan.jpg"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides ou utilisateur déjà existant
 *       401:
 *         description: Token Firebase invalide ou manquant
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connecte un utilisateur Firebase existant
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne le profil utilisateur
 *       401:
 *         description: Token Firebase invalide
 *       404:
 *         description: Profil utilisateur non trouvé
 */

/**
 * @swagger
 * /api/auth/update:
 *   put:
 *     summary: Met à jour le profil de l'utilisateur connecté
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Klan"
 *               lastName:
 *                 type: string
 *                 example: "Saah"
 *               avatarUrl:
 *                 type: string
 *                 example: "https://elyntis.com/avatars/klan-new.jpg"
 *               role:
 *                 type: string
 *                 enum: [user, organizer, staff, admin]
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *       401:
 *         description: Token Firebase invalide
 *       404:
 *         description: Utilisateur introuvable
 */

/**
 * @swagger
 * /api/auth/recover:
 *   post:
 *     summary: Envoie un lien de réinitialisation du mot de passe Firebase
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "klan@elyntis.com"
 *     responses:
 *       200:
 *         description: Lien de réinitialisation envoyé
 *       400:
 *         description: Adresse email manquante
 *       500:
 *         description: Erreur serveur lors de l'envoi du lien
 */

router.post("/register", verifyFirebaseToken, registerUser);
router.post("/login", verifyFirebaseToken, loginUser);
router.put("/update", verifyFirebaseToken, updateProfile);
router.post("/recover", recoverPassword);

export default router;

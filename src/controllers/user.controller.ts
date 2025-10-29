import { Request, Response } from "express";
import admin from "firebase-admin";
import User from "../models/User";

/**
 * Middleware pour vérifier le token Firebase
 * Vérifie le header "Authorization: Bearer <token>"
 */
export const verifyFirebaseToken = async (req: Request, res: Response, next: Function) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Token d'authentification manquant ou invalide" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token d'authentification manquant ou invalide" });
      return;
    }
    const decodedToken = await admin.auth().verifyIdToken(token);

    // On stocke les infos du user décodé dans req.user pour les prochaines étapes
    (req as any).user = decodedToken;
    next();
  } catch (error: any) {
    console.error("Erreur d'authentification Firebase :", error);
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

/**
 * @route POST /api/users
 * @desc Créer un utilisateur MongoDB lié à Firebase
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const decoded = (req as any).user;
    const { firstName, lastName, email, avatarUrl } = req.body;

    if (!firstName || !lastName || !email) {
      res.status(400).json({ message: "Champs obligatoires manquants" });
      return;
    }

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ firebaseUid: decoded.uid });
    if (existingUser) {
      res.status(200).json(existingUser);
      return;
    }

    const newUser = await User.create({
      firebaseUid: decoded.uid,
      firstName,
      lastName,
      email,
      avatarUrl,
    });

    res.status(201).json(newUser);
  } catch (error: any) {
    console.error("Erreur création utilisateur :", error);
    res.status(500).json({ message: error.message || "Erreur serveur" });
  }
};

/**
 * @route GET /api/users
 * @desc Récupère tous les utilisateurs (admin-only plus tard)
 */
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select("-__v");
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route GET /api/users/:id
 * @desc Récupère un utilisateur spécifique
 */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-__v");
    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable" });
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route PUT /api/users/:id
 * @desc Met à jour le profil d’un utilisateur
 * @access Restreint : seul le propriétaire du compte peut modifier son profil
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const decoded = (req as any).user;
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable" });
      return;
    }

    // Vérifie que le compte connecté correspond au compte à modifier
    if (user.firebaseUid !== decoded.uid) {
      res.status(403).json({ message: "Accès refusé" });
      return;
    }

    const { firstName, lastName, avatarUrl, city, country } = req.body;

    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;
    user.avatarUrl = avatarUrl ?? user.avatarUrl;
    (user as any).city = city ?? (user as any).city;
    (user as any).country = country ?? (user as any).country;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route DELETE /api/users/:id
 * @desc Supprime un utilisateur (seul le propriétaire peut se supprimer)
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const decoded = (req as any).user;
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable" });
      return;
    }

    if (user.firebaseUid !== decoded.uid) {
      res.status(403).json({ message: "Accès refusé" });
      return;
    }

    await user.deleteOne();
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

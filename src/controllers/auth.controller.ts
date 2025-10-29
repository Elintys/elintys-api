import { Request, Response } from "express";
import admin from "firebase-admin";
import User from "../models/User";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

/**
 * @route POST /api/auth/register
 * @desc Crée un nouvel utilisateur dans MongoDB à partir d'un compte Firebase existant.
 * @access Protégé (token Firebase requis)
 */
export const registerUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const firebaseUser = req.user;

    if (!firebaseUser) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const { firstName, lastName, email, avatarUrl } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ firebaseUid: firebaseUser.uid });
    if (existingUser) {
      return res.status(400).json({ message: "Utilisateur déjà enregistré" });
    }

    // Création du nouvel utilisateur MongoDB
    const newUser = await User.create({
      firebaseUid: firebaseUser.uid,
      firstName: firstName || firebaseUser.name?.split(" ")[0] || "Unknown",
      lastName: lastName || firebaseUser.name?.split(" ")[1] || "User",
      email: email || firebaseUser.email,
      avatarUrl: avatarUrl || firebaseUser.picture || "",
    });

    res.status(201).json(newUser);
  } catch (error: any) {
    console.error("Erreur lors de l'enregistrement :", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route POST /api/auth/login
 * @desc Vérifie si l'utilisateur Firebase est déjà enregistré dans MongoDB
 *       et renvoie son profil.
 * @access Protégé (token Firebase requis)
 */
export const loginUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const firebaseUser = req.user;

    if (!firebaseUser) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const user = await User.findOne({ firebaseUid: firebaseUser.uid });

    if (!user) {
      return res.status(404).json({
        message:
          "Aucun profil trouvé pour cet utilisateur. Veuillez d'abord vous enregistrer.",
      });
    }

    res.status(200).json(user);
  } catch (error: any) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route PUT /api/auth/update
 * @desc Met à jour les informations de profil de l'utilisateur connecté
 * @access Protégé (token Firebase requis)
 */
export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const firebaseUser = req.user;

    if (!firebaseUser) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const user = await User.findOne({ firebaseUid: firebaseUser.uid });

    if (!user) {
      return res.status(404).json({ message: "Profil utilisateur introuvable" });
    }

    const { firstName, lastName, avatarUrl, role } = req.body;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (avatarUrl) user.avatarUrl = avatarUrl;
    if (role) user.role = role;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route POST /api/auth/recover
 * @desc Envoie un lien de réinitialisation du mot de passe via Firebase Authentication.
 * @access Public
 */
export const recoverPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Adresse email requise" });
    }

    const link = await admin.auth().generatePasswordResetLink(email);

    res.status(200).json({
      message:
        "Lien de réinitialisation généré avec succès. Envoyez-le à l'utilisateur.",
      resetLink: link,
    });
  } catch (error: any) {
    console.error("Erreur lors de la récupération du mot de passe :", error);
    res.status(500).json({ message: error.message });
  }
};

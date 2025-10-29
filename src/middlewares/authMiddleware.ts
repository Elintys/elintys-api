import { Request, Response, NextFunction } from "express";
import admin from "../config/firebase";

export interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

/**
 * Vérifie la validité du token Firebase envoyé par le frontend.
 */
export const verifyFirebaseToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token middleware d'authentification manquant ou invalide" });
    }

    const token = authHeader.substring(7).trim();
    if (!token) {
      return res.status(401).json({ message: "Token d'authentification manquant ou invalide" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = decodedToken; // attaché à la requête
    next();
  } catch (error) {
    console.error("Erreur de vérification Firebase :", error);
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

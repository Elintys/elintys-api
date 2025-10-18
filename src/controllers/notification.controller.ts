import { Request, Response } from "express";
import Notification from "../models/Notification";
import User from "../models/User";

/**
 * @desc    Créer une nouvelle notification
 * @route   POST /api/notifications
 */
export const createNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, title, message, type } = req.body;

    if (!user || !title || !message) {
      res.status(400).json({ message: "Champs requis : user, title et message." });
      return;
    }

    // Vérifie que l'utilisateur existe
    const foundUser = await User.findById(user);
    if (!foundUser) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }

    const newNotification = new Notification({
      user,
      title,
      message,
      type: type || "system",
      read: false,
    });

    const savedNotification = await newNotification.save();

    // Optionnel : rattacher la notif à l'utilisateur
    await User.findByIdAndUpdate(user, { $push: { notifications: savedNotification._id } });

    res.status(201).json(savedNotification);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la création de la notification", error: error.message });
  }
};

/**
 * @desc    Récupérer toutes les notifications
 * @route   GET /api/notifications
 */
export const getAllNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await Notification.find()
      .populate("user", "firstName lastName email role");
    res.status(200).json(notifications);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la récupération des notifications", error: error.message });
  }
};

/**
 * @desc    Récupérer les notifications d’un utilisateur
 * @route   GET /api/notifications/user/:userId
 */
export const getNotificationsByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });

    if (!notifications || notifications.length === 0) {
      res.status(404).json({ message: "Aucune notification trouvée pour cet utilisateur." });
      return;
    }

    res.status(200).json(notifications);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la récupération des notifications utilisateur", error: error.message });
  }
};

/**
 * @desc    Marquer une notification comme lue
 * @route   PATCH /api/notifications/:id/read
 */
export const markNotificationAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const updated = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });

    if (!updated) {
      res.status(404).json({ message: "Notification non trouvée." });
      return;
    }

    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la notification", error: error.message });
  }
};

/**
 * @desc    Supprimer une notification
 * @route   DELETE /api/notifications/:id
 */
export const deleteNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      res.status(404).json({ message: "Notification non trouvée." });
      return;
    }

    // Nettoyer la référence côté utilisateur
    await User.updateMany({ notifications: id }, { $pull: { notifications: id } });

    res.status(200).json({ message: "Notification supprimée avec succès." });
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la suppression de la notification", error: error.message });
  }
};

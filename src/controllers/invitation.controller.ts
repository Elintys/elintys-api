import { Request, Response } from "express";
import Invitation from "../models/Invitation";
import Event from "../models/Event";
import User from "../models/User";

/**
 * @desc    Créer une nouvelle invitation
 * @route   POST /api/invitations
 */
export const createInvitation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { event, sender, recipientEmail } = req.body;

    if (!event || !sender || !recipientEmail) {
      res.status(400).json({ message: "Champs requis : event, sender, recipientEmail." });
      return;
    }

    // Vérifie que l'événement et l'expéditeur existent
    const foundEvent = await Event.findById(event);
    const foundUser = await User.findById(sender);

    if (!foundEvent || !foundUser) {
      res.status(404).json({ message: "Événement ou utilisateur non trouvé." });
      return;
    }

    // Vérifie qu'une invitation n’existe pas déjà pour ce destinataire
    const existingInvitation = await Invitation.findOne({ event, recipientEmail });
    if (existingInvitation) {
      res.status(409).json({ message: "Une invitation a déjà été envoyée à cet email pour cet événement." });
      return;
    }

    const newInvitation = new Invitation({
      event,
      sender,
      recipientEmail,
      status: "pending",
      sentAt: new Date(),
    });

    const savedInvitation = await newInvitation.save();

    res.status(201).json(savedInvitation);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la création de l'invitation", error: error.message });
  }
};

/**
 * @desc    Récupérer toutes les invitations
 * @route   GET /api/invitations
 */
export const getAllInvitations = async (req: Request, res: Response): Promise<void> => {
  try {
    const invitations = await Invitation.find()
      .populate("event", "title startDate endDate")
      .populate("sender", "firstName lastName email");
    res.status(200).json(invitations);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la récupération des invitations", error: error.message });
  }
};

/**
 * @desc    Récupérer les invitations liées à un événement
 * @route   GET /api/invitations/event/:eventId
 */
export const getInvitationsByEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId } = req.params;
    const invitations = await Invitation.find({ event: eventId })
      .populate("sender", "firstName lastName email");

    if (!invitations || invitations.length === 0) {
      res.status(404).json({ message: "Aucune invitation trouvée pour cet événement." });
      return;
    }

    res.status(200).json(invitations);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la récupération des invitations de l'événement", error: error.message });
  }
};

/**
 * @desc    Mettre à jour le statut d'une invitation
 * @route   PATCH /api/invitations/:id
 */
export const updateInvitationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "accepted", "declined"].includes(status)) {
      res.status(400).json({ message: "Statut invalide. Valeurs possibles : pending, accepted, declined." });
      return;
    }

    const updatedInvitation = await Invitation.findByIdAndUpdate(id, { status }, { new: true })
      .populate("event", "title")
      .populate("sender", "firstName lastName");

    if (!updatedInvitation) {
      res.status(404).json({ message: "Invitation non trouvée." });
      return;
    }

    res.status(200).json(updatedInvitation);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'invitation", error: error.message });
  }
};

/**
 * @desc    Supprimer une invitation
 * @route   DELETE /api/invitations/:id
 */
export const deleteInvitation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedInvitation = await Invitation.findByIdAndDelete(id);
    if (!deletedInvitation) {
      res.status(404).json({ message: "Invitation non trouvée." });
      return;
    }

    res.status(200).json({ message: "Invitation supprimée avec succès." });
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'invitation", error: error.message });
  }
};

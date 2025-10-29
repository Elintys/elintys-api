// controllers/invitation.controller.ts
import { Request, Response } from "express";
import Invitation from "../models/Invitation";

/**
 * @desc    Créer une nouvelle invitation
 * @route   POST /api/invitations
 * @access  Private
 */
export const createInvitation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { event, guest, fullName, email, message, isCouple } = req.body;

    if (!event || !fullName) {
      res.status(400).json({ message: "L'événement et le nom de l'invité sont requis." });
      return;
    }

    const newInvitation = await Invitation.create({
      event,
      guest,
      fullName,
      email,
      message,
      isCouple,
    });

    res.status(201).json(newInvitation);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'invitation.", error });
  }
};

/**
 * @desc    Récupérer toutes les invitations
 * @route   GET /api/invitations
 * @access  Private
 */
export const getAllInvitations = async (req: Request, res: Response): Promise<void> => {
  try {
    const invitations = await Invitation.find()
      .populate("event", "title startDate endDate")
      .populate("guest", "firstName lastName email");

    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des invitations.", error });
  }
};

/**
 * @desc    Récupérer les invités d’un événement donné
 * @route   GET /api/invitations/event/:eventId
 * @access  Private
 */
export const getGuestsByEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId } = req.params;

    const invitations = await Invitation.find({ event: eventId })
    // .populate("guest")
    // .populate("event");
    // .populate("guest", "firstName lastName email")
    // .populate("event", "title startDate endDate");
    
    console.log('====================================');
    console.log("eventId for guest: ",invitations);
    console.log('====================================');
    if (invitations.length === 0) {
      res.status(404).json({ message: "Aucune invitation trouvée pour cet événement." });
      return;
    }

    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des invités.", error });
  }
};

/**
 * @desc    Mettre à jour le statut ou le scan d’une invitation
 * @route   PUT /api/invitations/:id
 * @access  Private
 */
export const updateInvitation = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Invitation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ message: "Invitation introuvable." });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'invitation.", error });
  }
};

/**
 * @desc    Supprimer une invitation
 * @route   DELETE /api/invitations/:id
 * @access  Private
 */
export const deleteInvitation = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Invitation.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ message: "Invitation introuvable." });
      return;
    }

    res.status(200).json({ message: "Invitation supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'invitation.", error });
  }
};

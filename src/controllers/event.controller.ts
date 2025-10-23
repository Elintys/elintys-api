import { Request, Response } from "express";
import Event from "../models/Event";

/**
 * @desc    Récupérer tous les événements
 * @route   GET /api/events
 * @access  Private
 */
export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find()
      .populate("organizer", "firstName lastName email")
      .populate("organization", "name")
      .populate("venue", "name address country city")
      .populate("tickets")
      .populate("staff", "firstName lastName");

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des événements", error });
  }
};

/**
 * @desc    Récupérer un événement par ID
 * @route   GET /api/events/:id
 * @access  Private
 */
export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "firstName lastName email")
      .populate("organization")
      .populate("venue")
      .populate("tickets")
      .populate("staff", "firstName lastName");

    if (!event) {
      res.status(404).json({ message: "Événement introuvable" });
      return;
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * @desc    Récupérer les événements d’un utilisateur
 * @route   GET /api/events/user/:userId
 * @access  Private
 */
export const getEventsByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const events = await Event.find({ organizer: userId })
      .populate("organization", "name")
      .populate("venue", "name address country city")
      .populate("tickets")
      .populate("staff", "firstName lastName");

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des événements de l’utilisateur", error });
  }
};

/**
 * @desc    Créer un nouvel événement
 * @route   POST /api/events
 * @access  Private
 */
export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, organizer, organization, venue, category, startDate, endDate, isPublic } = req.body;

    if (!title || !organizer || !startDate || !endDate) {
      res.status(400).json({ message: "Les champs requis sont manquants" });
      return;
    }

    const newEvent = await Event.create({
      title,
      description,
      organizer,
      organization,
      venue,
      category,
      startDate,
      endDate,
      isPublic,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l’événement", error });
  }
};

/**
 * @desc    Mettre à jour un événement existant
 * @route   PUT /api/events/:id
 * @access  Private
 */
export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      res.status(404).json({ message: "Événement non trouvé" });
      return;
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l’événement", error });
  }
};

/**
 * @desc    Supprimer un événement
 * @route   DELETE /api/events/:id
 * @access  Private
 */
export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      res.status(404).json({ message: "Événement non trouvé" });
      return;
    }

    res.status(200).json({ message: "Événement supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l’événement", error });
  }
};


/**
 * @desc    Récupérer les événements par catégorie
 * @route   GET /api/events/category/:categoryId
 * @access  Private
 */
export const getEventsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params;

    // Vérifie que l’ID est valide
    if (!categoryId) {
      res.status(400).json({ message: "L'ID de la catégorie est requis" });
      return;
    }

    const events = await Event.find({ category: categoryId })
      .populate("organizer", "firstName lastName email")
      .populate("organization", "name")
      .populate("venue", "name address country city")
      .populate("tickets")
      .populate("staff", "firstName lastName")
      .populate("category", "name color icon");

    if (events.length === 0) {
      res.status(404).json({ message: "Aucun événement trouvé pour cette catégorie" });
      return;
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des événements de cette catégorie",
      error,
    });
  }
};


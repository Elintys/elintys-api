// controllers/venueController.ts
import { Request, Response } from "express";
import Venue from "../models/Venue";

/**
 * @desc    Récupérer tous les lieux (venues)
 * @route   GET /api/venues
 */
export const getAllVenues = async (req: Request, res: Response): Promise<void> => {
  try {
    // Récupération de tous les documents de la collection Venue
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des lieux", error });
  }
};

/**
 * @desc    Récupérer un lieu par ID
 * @route   GET /api/venues/:id
 */
export const getVenueById = async (req: Request, res: Response): Promise<void> => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      res.status(404).json({ message: "Lieu non trouvé" });
      return;
    }

    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du lieu", error });
  }
};

/**
 * @desc    Créer un nouveau lieu
 * @route   POST /api/venues
 */
export const createVenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, capacity, type, description, imageUrl } = req.body;

    // Vérification des champs obligatoires
    if (!name || !address || !capacity) {
      res.status(400).json({ message: "Nom, adresse et capacité sont requis" });
      return;
    }

    // Création du nouveau document
    const newVenue = await Venue.create({
      name,
      address,
      capacity,
      type,
      description,
      imageUrl,
    });

    res.status(201).json(newVenue);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du lieu", error });
  }
};

/**
 * @desc    Mettre à jour un lieu existant
 * @route   PUT /api/venues/:id
 */
export const updateVenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedVenue = await Venue.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Retourne le document mis à jour
      runValidators: true, // Vérifie la validité des champs
    });

    if (!updatedVenue) {
      res.status(404).json({ message: "Lieu non trouvé" });
      return;
    }

    res.status(200).json(updatedVenue);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du lieu", error });
  }
};

/**
 * @desc    Supprimer un lieu
 * @route   DELETE /api/venues/:id
 */
export const deleteVenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedVenue = await Venue.findByIdAndDelete(req.params.id);

    if (!deletedVenue) {
      res.status(404).json({ message: "Lieu non trouvé" });
      return;
    }

    res.status(200).json({ message: "Lieu supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du lieu", error });
  }
};

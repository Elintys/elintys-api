import { Request, Response } from "express";
import Organization from "../models/Organization";
import User from "../models/User";

// CREATE — POST /api/organizations
export const createOrganization = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, logoUrl, description, owner } = req.body;

    if (!name || !owner) {
      res.status(400).json({ message: "Le nom et l'identifiant du propriétaire sont requis." });
      return;
    }

    const newOrganization = new Organization({
      name,
      logoUrl,
      description,
      owner,
      members: [owner],
      events: []
    });

    const savedOrg = await newOrganization.save();

    // ajouter cette organisation au profil du propriétaire
    await User.findByIdAndUpdate(owner, { $push: { organizations: savedOrg._id } });

    res.status(201).json(savedOrg);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la création de l'organisation", error: error.message });
  }
};

// READ ALL — GET /api/organizations
export const getAllOrganizations = async (req: Request, res: Response): Promise<void> => {
  try {
    const organizations = await Organization.find()
      .populate("owner", "firstName lastName email")
      .populate("members", "firstName lastName email")
      .populate("events", "title date");
    res.status(200).json(organizations);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la récupération des organisations", error: error.message });
  }
};

// READ ONE — GET /api/organizations/:id
export const getOrganizationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const organization = await Organization.findById(id)
      .populate("owner", "firstName lastName email")
      .populate("members", "firstName lastName email")
      .populate("events", "title date");

    if (!organization) {
      res.status(404).json({ message: "Organisation non trouvée." });
      return;
    }

    res.status(200).json(organization);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'organisation", error: error.message });
  }
};

// UPDATE — PUT /api/organizations/:id
export const updateOrganization = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedOrg = await Organization.findByIdAndUpdate(id, updates, { new: true })
      .populate("owner", "firstName lastName email")
      .populate("members", "firstName lastName email")
      .populate("events", "title date");

    if (!updatedOrg) {
      res.status(404).json({ message: "Organisation non trouvée." });
      return;
    }

    res.status(200).json(updatedOrg);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'organisation", error: error.message });
  }
};

// DELETE — DELETE /api/organizations/:id
export const deleteOrganization = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedOrg = await Organization.findByIdAndDelete(id);
    if (!deletedOrg) {
      res.status(404).json({ message: "Organisation non trouvée." });
      return;
    }

    // Optionnel : retirer cette org de la liste des utilisateurs membres
    await User.updateMany(
      { organizations: deletedOrg._id },
      { $pull: { organizations: deletedOrg._id } }
    );

    res.status(200).json({ message: "Organisation supprimée avec succès." });
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'organisation", error: error.message });
  }
};

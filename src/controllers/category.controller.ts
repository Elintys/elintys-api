// controllers/category.controller.ts
import { Request, Response } from "express";
import Category from "../models/Category";

/**
 * @desc    Récupérer toutes les catégories
 * @route   GET /api/categories
 * @access  Private
 */
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des catégories", error });
  }
};

/**
 * @desc    Récupérer une catégorie par ID
 * @route   GET /api/categories/:id
 * @access  Private
 */
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ message: "Catégorie introuvable" });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la catégorie", error });
  }
};

/**
 * @desc    Créer une nouvelle catégorie
 * @route   POST /api/categories
 * @access  Private
 */
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, color, icon } = req.body;

    if (!name) {
      res.status(400).json({ message: "Le nom de la catégorie est requis" });
      return;
    }

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      res.status(400).json({ message: "Cette catégorie existe déjà" });
      return;
    }

    const newCategory = await Category.create({ name, description, color, icon });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la catégorie", error });
  }
};

/**
 * @desc    Mettre à jour une catégorie
 * @route   PUT /api/categories/:id
 * @access  Private
 */
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      res.status(404).json({ message: "Catégorie introuvable" });
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la catégorie", error });
  }
};

/**
 * @desc    Supprimer une catégorie
 * @route   DELETE /api/categories/:id
 * @access  Private
 */
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      res.status(404).json({ message: "Catégorie introuvable" });
      return;
    }

    res.status(200).json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la catégorie", error });
  }
};

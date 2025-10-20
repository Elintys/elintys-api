import { Request, Response } from "express";
import Ticket from "../models/Ticket";
import User from "../models/User";
import Event from "../models/Event";

// CREATE — POST /api/tickets
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { event, owner, type, price, qrCode, status } = req.body;

    if (!event || !owner || !type || !price) {
      res.status(400).json({ message: "Champs requis : event, owner, type et price." });
      return;
    }

    // Vérifier que l'événement et l'utilisateur existent
    const foundEvent = await Event.findById(event);
    const foundUser = await User.findById(owner);

    if (!foundEvent || !foundUser) {
      res.status(404).json({ message: "Utilisateur ou événement non trouvé." });
      return;
    }

    const newTicket = new Ticket({
      event,
      owner,
      type,
      price,
      qrCode,
      status: status || "active",
    });

    const savedTicket = await newTicket.save();

    // Ajouter le ticket à l'utilisateur et à l'événement
    await User.findByIdAndUpdate(owner, { $push: { tickets: savedTicket._id } });
    await Event.findByIdAndUpdate(event, { $push: { tickets: savedTicket._id } });

    res.status(201).json(savedTicket);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la création du ticket", error: error.message });
  }
};

// READ ALL — GET /api/tickets
export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickets = await Ticket.find()
      .populate("event", "title date location")
      // .populate("owner", "firstName lastName email");
    res.status(200).json(tickets);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la récupération des tickets", error: error.message });
  }
};

// READ ONE — GET /api/tickets/:id
export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id)
      .populate("event", "title date location")
      .populate("owner", "firstName lastName email");

    if (!ticket) {
      res.status(404).json({ message: "Ticket non trouvé." });
      return;
    }

    res.status(200).json(ticket);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la récupération du ticket", error: error.message });
  }
};

// UPDATE — PUT /api/tickets/:id
export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(id, updates, { new: true })
      .populate("event", "title date location")
      .populate("owner", "firstName lastName email");

    if (!updatedTicket) {
      res.status(404).json({ message: "Ticket non trouvé." });
      return;
    }

    res.status(200).json(updatedTicket);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du ticket", error: error.message });
  }
};

// DELETE — DELETE /api/tickets/:id
export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      res.status(404).json({ message: "Ticket non trouvé." });
      return;
    }

    // Nettoyer les références dans User et Event
    await User.updateMany({ tickets: id }, { $pull: { tickets: id } });
    await Event.updateMany({ tickets: id }, { $pull: { tickets: id } });

    res.status(200).json({ message: "Ticket supprimé avec succès." });
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la suppression du ticket", error: error.message });
  }
};

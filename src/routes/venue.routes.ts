// routes/venueRoutes.ts
import { Router } from "express";
import {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
} from "../controllers/venue.controller";

const router = Router();

// Définition des routes CRUD
router.get("/", getAllVenues);       // GET /api/venues
router.get("/:id", getVenueById);    // GET /api/venues/:id
router.post("/", createVenue);       // POST /api/venues
router.put("/:id", updateVenue);     // PUT /api/venues/:id
router.delete("/:id", deleteVenue);  // DELETE /api/venues/:id

export default router;

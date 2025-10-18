import express from "express";
import {
  createInvitation,
  getAllInvitations,
  getInvitationsByEvent,
  updateInvitationStatus,
  deleteInvitation
} from "../controllers/invitation.controller";

const router = express.Router();

router.post("/", createInvitation);
router.get("/", getAllInvitations);
router.get("/event/:eventId", getInvitationsByEvent);
router.patch("/:id", updateInvitationStatus);
router.delete("/:id", deleteInvitation);

export default router;

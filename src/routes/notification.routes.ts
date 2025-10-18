import express from "express";
import {
  createNotification,
  getAllNotifications,
  getNotificationsByUser,
  markNotificationAsRead,
  deleteNotification
} from "../controllers/notification.controller";

const router = express.Router();

// Routes CRUD pour notifications
router.post("/", createNotification);
router.get("/", getAllNotifications);
router.get("/user/:userId", getNotificationsByUser);
router.patch("/:id/read", markNotificationAsRead);
router.delete("/:id", deleteNotification);

export default router;

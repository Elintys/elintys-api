import mongoose from "mongoose";
import dotenv from "dotenv";

import User, { IUser } from "../models/User";
import Event, { IEvent } from "../models/Event";
import Organization, { IOrganization } from "../models/Organization";
import Venue, { IVenue } from "../models/Venue";
import Ticket, { ITicket } from "../models/Ticket";
import Notification, { INotification } from "../models/Notification";

dotenv.config();

// =============================
//  CONNECTION À LA BASE
// =============================
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("Erreur MongoDB:", err));

// =============================
//  DUMMY DATA
// =============================

const usersData: Partial<IUser>[] = Array.from({ length: 30 }).map((_, i) => ({
  firstName: ["Lucas", "Emma", "Noah", "Liam", "Sofia", "Ava", "Ethan", "Mila"][i % 8],
  lastName: ["Smith", "Johnson", "Brown", "Garcia", "Martinez", "Dubois", "Tremblay", "Roy"][i % 8],
  email: `user${i + 1}@elyntis.com`,
  password: "hashed_password_example",
  avatarUrl: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i + 10}.jpg`,
  role: i % 10 === 0 ? "admin" : i % 3 === 0 ? "organizer" : "user",
}));

const organizationsData: Partial<IOrganization>[] = Array.from({ length: 10 }).map((_, i) => ({
  name: `Événementiel ${["Montréal", "Québec", "Paris", "Toronto", "Laval"][i % 5]}`,
  logoUrl: `https://api.logo.com/${i}.png`,
  description: "Agence spécialisée dans la création d’événements personnalisés.",
  owner: undefined,
  members: [],
  events: [],
}));

const venuesData: Partial<IVenue>[] = Array.from({ length: 15 }).map((_, i) => ({
  name: `Salle ${["Nova", "Espace Lumière", "Horizons", "Cosmos", "Signature"][i % 5]} ${i + 1}`,
  address: `${100 + i} Rue Sainte-Catherine O, Montréal, QC`,
  capacity: 100 + (i * 25),
  type: ["Salle de conférence", "Théâtre", "Salle de réception", "Open space"][i % 4],
}));

const eventsData: Partial<IEvent>[] = Array.from({ length: 30 }).map((_, i) => ({
  title: ["Tech Summit", "Gala Étudiant", "Startup Night", "Expo Créative", "Concert Live"][i % 5] + ` ${i + 1}`,
  description: "Un événement captivant organisé pour réunir des passionnés autour d’un thème unique.",
  startDate: new Date(2025, (i % 12), (i % 28) + 1, 18, 0, 0),
  endDate: new Date(2025, (i % 12), (i % 28) + 1, 23, 0, 0),
  isPublic: i % 2 === 0,
  category: ["Tech", "Musique", "Business", "Art", "Éducation"][i % 5],
  tickets: [],
  staff: [],
  organization: undefined,
  organizer: undefined,
  venue: undefined,
}));

const ticketsData: Partial<ITicket>[] = Array.from({ length: 50 }).map((_, i) => ({
  event: undefined,
  user: undefined,
  price: (i % 5 + 1) * 25,
  status: i % 10 === 0 ? "cancelled" : "valid",
  qrCode: `QR_${Math.random().toString(36).substring(7)}`,
}));

const notificationsData: Partial<INotification>[] = Array.from({ length: 30 }).map((_, i) => ({
  user: undefined,
  title: ["Nouvel événement", "Mise à jour", "Rappel", "Confirmation"][i % 4],
  message: `Notification ${i + 1}: Votre ${i % 2 === 0 ? "événement" : "billet"} a été mis à jour.`,
  read: i % 3 === 0,
}));

// =============================
//  INSERTION DES DONNÉES
// =============================
const seedDatabase = async () => {
  try {
    await Promise.all([
      User.deleteMany({}),
      Event.deleteMany({}),
      Organization.deleteMany({}),
      Venue.deleteMany({}),
      Ticket.deleteMany({}),
      Notification.deleteMany({}),
    ]);

    const users = await User.insertMany(usersData);

    organizationsData.forEach((org, i) => {
      org.owner = users[i]._id;
      org.members = users.slice(i, i + 5).map((u) => u._id);
    });
    const organizations = await Organization.insertMany(organizationsData);

    const venues = await Venue.insertMany(venuesData);

    eventsData.forEach((ev, i) => {
      ev.organizer = users[i % users.length]._id;
      ev.organization = organizations[i % organizations.length]._id;
      ev.venue = venues[i % venues.length]._id;
      ev.staff = users.slice(i, i + 3).map((u) => u._id);
    });
    const events = await Event.insertMany(eventsData);

    ticketsData.forEach((t, i) => {
      t.event = events[i % events.length]._id;
      t.user = users[i % users.length]._id;
    });
    await Ticket.insertMany(ticketsData);

    notificationsData.forEach((n, i) => {
      n.user = users[i % users.length]._id;
    });
    await Notification.insertMany(notificationsData);

    console.log("✅ Données fictives insérées avec succès !");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur lors du seed :", err);
    process.exit(1);
  }
};

seedDatabase();

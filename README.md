# elintys-api

---

```markdown
# GuestPass API

**GuestPass** est une API Node.js/TypeScript qui centralise les événements provenant de différentes sources (Eventbrite, organisateurs indépendants, etc.).  
Elle permet également aux utilisateurs et aux organisateurs de **créer, gérer et découvrir des événements** avec des fonctionnalités de billetterie et d’invitations.

---

## Fonctionnalités principales

- Gestion des utilisateurs (authentification, rôles, profils)
- Organisations et membres (gestion d’équipes)
- Création et gestion d’événements
- Gestion des lieux (venues)
- Invitations et notifications en temps réel
- Génération de tickets avec QR codes
- Intégration avec des sources externes (Eventbrite, Meetup…)

---

## Stack technique

| Catégorie | Technologie |
|------------|--------------|
| **Langage** | TypeScript |
| **Serveur** | Node.js + Express |
| **Base de données** | MongoDB (Mongoose) |
| **ORM/ODM** | Mongoose |
| **Gestion d’environnement** | dotenv |
| **Logger** | morgan |
| **Validation** | express-validator |
| **Hashing / Sécurité** | bcrypt, JWT |
| **Tests** | Jest / Supertest (optionnel) |

---

## Structure du projet


guestpass-api/
│
├── src/
│   ├── config/              # Configuration (db, env, etc.)
│   ├── models/              # Schémas Mongoose (User, Event, etc.)
│   ├── controllers/         # Logique métier et endpoints
│   ├── routes/              # Fichiers de routage Express
│   ├── middlewares/         # Authentification, validation, etc.
│   ├── utils/               # Fonctions utilitaires
│   ├── seed/                # Scripts pour insérer des données fictives
│   └── app.ts               # Initialisation d’Express
│
├── .env                     # Variables d’environnement
├── package.json
├── tsconfig.json
└── README.md

````

---

## Installation

### Cloner le dépôt

```bash
git clone https://github.com/ton-utilisateur/guestpass-api.git
cd guestpass-api
````

### Installer les dépendances

```bash
npm install
```

### Configurer l’environnement

Crée un fichier `.env` à la racine du projet :

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/guestpass
JWT_SECRET=ton_secret_jwt
NODE_ENV=development
```

---

## Lancer le serveur

### En mode développement :

```bash
npm run dev
```

### En mode production :

```bash
npm run build
npm start
```

Le serveur sera disponible sur :

```
http://localhost:3000
```

---

## Peupler la base de données

Tu peux insérer des **données fictives réalistes (dummy data)** pour tester ton API :

```bash
npm run seed
```

Le script `seed.ts` crée :

* 30 utilisateurs (`users`)
* 10 organisations (`organizations`)
* 30 événements (`events`)
* 15 tickets (`tickets`)
* 10 notifications (`notifications`)
* 5 lieux (`venues`)

---

## Principaux modèles Mongoose

### User

```ts
{
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  avatarUrl?: String,
  role: "user" | "organizer" | "staff" | "admin",
  organizations: ObjectId[],
  createdEvents: ObjectId[],
  tickets: ObjectId[],
  notifications: ObjectId[]
}
```

###  Event

```ts
{
  title: String,
  description?: String,
  organizer: ObjectId,
  organization?: ObjectId,
  venue?: ObjectId,
  category?: String,
  startDate: Date,
  endDate: Date,
  isPublic: Boolean,
  tickets: ObjectId[],
  staff: ObjectId[]
}
```

### Organization

```ts
{
  name: String,
  logoUrl?: String,
  description?: String,
  owner: ObjectId,
  members: ObjectId[],
  events: ObjectId[]
}
```

---

## Endpoints principaux

| Méthode | Endpoint             | Description                           |
| ------- | -------------------- | ------------------------------------- |
| `POST`  | `/api/auth/register` | Créer un compte utilisateur           |
| `POST`  | `/api/auth/login`    | Se connecter                          |
| `GET`   | `/api/users`         | Lister les utilisateurs               |
| `GET`   | `/api/events`        | Lister tous les événements            |
| `POST`  | `/api/events`        | Créer un nouvel événement             |
| `GET`   | `/api/events/:id`    | Détails d’un événement                |
| `POST`  | `/api/organizations` | Créer une organisation                |
| `GET`   | `/api/venues`        | Lister les lieux disponibles          |
| `POST`  | `/api/tickets`       | Générer un ticket pour un utilisateur |

---

## Scripts npm utiles

| Commande        | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Démarre le serveur en mode développement |
| `npm run build` | Compile le projet TypeScript             |
| `npm start`     | Démarre le serveur compilé               |
| `npm run seed`  | Insère les données de test               |
| `npm run lint`  | Vérifie la syntaxe TypeScript/ESLint     |

---

## À venir (roadmap)

* Notifications temps réel via Socket.io
* API mobile pour React Native
* Paiement sécurisé des tickets
* Recommandation intelligente d’événements
* Multi-langue (FR/EN)

---

## Auteur

**Noé Kenfack**
Développeur full-stack / UX Designer
📍 Basé à Montréal, Canada
🌐 [www.ultradominons.com/ds](https://www.ultradominons.com/ds)

---

## 🪪 Licence

Ce projet est sous licence **MIT** — libre de modification et d’utilisation.

---

```

# TaskFlow — Application Full-Stack

Application de gestion de tâches avec React (client) et Node.js/Express/MongoDB (serveur).

## Structure du projet

```
taskflow-backend/
├── client/          → Front-End React (Vite)
├── server/          → Back-End Node.js / Express / MongoDB
└── README.md
```

## Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- [MongoDB](https://www.mongodb.com/try/download/community) installé localement **ou** un compte [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 1. Démarrer la base de données

### Option A — MongoDB local (MongoDB Compass)
Lance MongoDB sur ton système (il tourne en général automatiquement).  
Vérifie dans Compass que la connexion `mongodb://127.0.0.1:27017` fonctionne.

### Option B — MongoDB Atlas (cloud)
1. Crée un cluster gratuit sur [atlas.mongodb.com](https://www.mongodb.com/atlas)
2. Copie ton URI de connexion et remplace `MONGO_URI` dans `server/.env`

---

## 2. Démarrer le serveur Back-End

```bash
cd server
npm install          # installe express, mongoose, cors, dotenv, nodemon
npm run dev          # démarre avec nodemon (redémarrage automatique)
```

Le serveur écoute sur **http://localhost:5000**

### Tester que le serveur fonctionne
```
GET http://localhost:5000/api/ping
→ { "message": "Serveur TaskFlow operationnel" }
```

---

## 3. Démarrer le Front-End React

```bash
cd client
npm install
npm run dev
```

L'interface est accessible sur **http://localhost:5173**

---

## Routes API disponibles

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/ping` | Test serveur |
| GET | `/api/tasks` | Lister toutes les tâches |
| POST | `/api/tasks` | Créer une tâche |
| PUT | `/api/tasks/:id` | Mettre à jour le statut |
| DELETE | `/api/tasks/:id` | Supprimer une tâche |

### Exemple de body POST
```json
{
  "title": "Conception de l'ontologie",
  "description": "Rédiger les axiomes de base.",
  "status": "A faire"
}
```

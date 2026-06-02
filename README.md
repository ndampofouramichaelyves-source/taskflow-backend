# TaskFlow — Application ajouté du back-end a celle du front end précédent 

> TP Réalisé par NDAM POFOURA MICHAEL 


Application de gestion de tâches développée en architecture **Full-Stack** :  
un front-end **React/Vite** communiquant avec un back-end **Node.js/Express/MongoDB** via une API REST.

---

## Architecture complète du projet

```
taskflow-backend/                        ← Racine du dépôt Git
│
├── .gitignore                           ← Fichiers exclus du dépôt (node_modules, .env)
├── README.md                            ← Ce fichier
│
├── client/                               ← FRONT-END React avec vite (ce dossier est exactement celui de taskflow-frontend  │   │                                      avec des modifications exigés)
│   │
│   └── src/
│       ├── main.jsx                     ← Point d'entrée React (monte <App />)
│       ├── App.jsx                      ← Routeur principal (BrowserRouter + Routes)
│       │
│       ├── layouts/
│       │   └── Navbar.jsx               ← Barre de navigation (logo + titre)
│       │
│       ├── components/
│       │   ├── TaskCard.jsx             ← Carte d'affichage d'une tâche
│       │   └── TaskForm.jsx             ← Formulaire d'ajout de tâche
│       │
│       ├── hooks/
│       │   └── useLocalStorage.js       ← (ancien hook — remplacé par fetch API)
│       │
│       └── pages/
│           ├── Dashboard.jsx            ← Page principale : liste + ajout de tâches
│           │                              (Jalon 5 : useEffect + fetch GET/POST)
│           └── TaskDetail.jsx           ← Page détail d'une tâche
│                                          (Jalon 5 : fetch GET /api/tasks/:id)
│
└── server/                              ← BACK-END Node.js / Express / MongoDB
    │
    ├── .env                             ← Variables d'environnement (NE PAS commiter)
    │                                      PORT, MONGO_URI, CLIENT_URL
    ├── package.json                     ← Dépendances et scripts npm
    ├── server.js                        ← Point d'entrée du serveur
    │                                      (Express + CORS + connexion MongoDB)
    │
    ├── models/
    │   └── Task.js                      ← Schéma Mongoose (title, description, status)
    │                                      Validations : required, maxlength, enum
    │
    ├── controllers/
    │   └── taskController.js            ← Logique métier (accès base de données)
    │                                      getAllTasks | getTaskById | createTask
    │                                      updateTaskStatus | deleteTask
    │
    └── routes/
        └── taskRoutes.js                ← Définition des routes RESTful
                                           GET / | GET /:id | POST / | PUT /:id | DELETE /:id
```

---

## Prérequis

| Outil | Version minimale | Lien |
|-------|-----------------|------|
| Node.js | v18+ | https://nodejs.org |
| npm | v9+ | inclus avec Node.js |
| MongoDB | v6+ | https://www.mongodb.com/try/download/community |

---

## Installation et démarrage

> ⚠️ Il faut **deux terminaux ouverts en même temps** : un pour le serveur, un pour le client.

### Étape 1 — Démarrer le serveur back-end (Terminal 1)

```bash
cd server
npm install
npm run dev
```

**Résultat attendu :**
```
✅ Connecté à MongoDB
🚀 Serveur démarré sur http://localhost:5000
```

**Tester que le serveur fonctionne** (dans le navigateur) :
```
http://localhost:5000/api/ping
→ { "message": "Serveur TaskFlow operationnel" }

http://localhost:5000/api/tasks
→ []
```

---

### Étape 2 — Démarrer le front-end React (Terminal 2)

```bash
cd client
npm install
npm run dev
```

**Résultat attendu :**
```
VITE v5.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

Ouvre **http://localhost:5173** dans ton navigateur pour utiliser l'application.

---

## Routes API disponibles

| Méthode | Route | Description | Code succès |
|---------|-------|-------------|-------------|
| `GET` | `/api/ping` | Test — vérifie que le serveur tourne | 200 |
| `GET` | `/api/tasks` | Récupère toutes les tâches | 200 |
| `GET` | `/api/tasks/:id` | Récupère une tâche par son ID | 200 |
| `POST` | `/api/tasks` | Crée une nouvelle tâche | **201** |
| `PUT` | `/api/tasks/:id` | Met à jour le statut d'une tâche | 200 |
| `DELETE` | `/api/tasks/:id` | Supprime une tâche | 200 |

### Exemple — Créer une tâche (POST)

```json
POST http://localhost:5000/api/tasks
Content-Type: application/json

{
  "title": "Conception de l'ontologie",
  "description": "Rédiger les axiomes de base.",
  "status": "A faire"
}
```

### Exemple — Mettre à jour le statut (PUT)

```json
PUT http://localhost:5000/api/tasks/<id>
Content-Type: application/json

{
  "status": "En cours"
}
```

Valeurs acceptées pour `status` : `"A faire"` · `"En cours"` · `"Termine"`

---

## Variables d'environnement (`server/.env`)

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
CLIENT_URL=http://localhost:5173
```

> ⚠️ Ce fichier est dans `.gitignore` et ne doit jamais être poussé sur Git.

---

## Jalons du TP couverts

| Jalon | Description | Points |
|-------|-------------|--------|
| Jalon 1 | Serveur Express + route `/api/ping` + variables `.env` 
| Jalon 2 | Schéma Mongoose avec validations (`required`, `maxlength`, `enum`) 
| Jalon 3 | Architecture MVC : contrôleurs + routes RESTful + `try/catch` 
| Jalon 4 | Middlewares `express.json()` + CORS restreint à `localhost:5173` 
| Jalon 5 | Intégration Full-Stack : `localStorage` remplacé par `fetch` API 

---

## Technologies utilisées

**Front-End**
- React 18 + Vite
- React Router DOM
- Fetch API (natif)

**Back-End**
- Node.js + Express
- Mongoose (ODM MongoDB)
- CORS + dotenv
- nodemon (développement)

**Base de données**
- MongoDB (NoSQL)

# 📋 TaskFlow — Projet Full-Stack (TP Ingénierie Back-End)

> **ENSP Maroua — Niveau 3 — IDE & Frameworks**
> Enseignant : MANAODA DEUHWE Yves Hermann

---

## 🗂️ Structure du projet

```
taskflow/
├── taskflow-backend/          ← Serveur Node.js / Express
│   ├── config/
│   │   └── db.js              ← Connexion MongoDB
│   ├── controllers/
│   │   └── taskController.js  ← Logique métier (CRUD)
│   ├── models/
│   │   └── Task.js            ← Schéma Mongoose
│   ├── routes/
│   │   └── taskRoutes.js      ← Définition des routes REST
│   ├── .env                   ← Variables d'environnement (NON commité)
│   ├── .env.example           ← Modèle du fichier .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js              ← Point d'entrée principal
│
└── taskflow-client/           ← Interface React
    └── src/
        ├── App.jsx            ← Composant principal (API calls)
        └── App.css            ← Styles
```

---

## 🚀 Installation et Démarrage

### Prérequis
- [Node.js](https://nodejs.org) v18 ou supérieur
- [MongoDB](https://www.mongodb.com/try/download/community) (local) **OU** un compte [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud)
- [npm](https://www.npmjs.com/) (inclus avec Node.js)

---

### Étape 1 : Démarrer la base de données MongoDB

**Option A — MongoDB local (MongoDB Compass)**
```bash
# Sous Windows : MongoDB se lance comme un service Windows
# Vérifiez dans les Services Windows que "MongoDB" est démarré
# OU lancez manuellement :
mongod --dbpath C:\data\db
```

```bash
# Sous Linux/macOS :
sudo systemctl start mongod
# OU
mongod --dbpath ~/data/db
```

**Option B — MongoDB Atlas (cloud)**
1. Créez un compte sur [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Créez un cluster gratuit (M0)
3. Copiez la chaîne de connexion et mettez-la dans `.env` :
   ```
   MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/taskflow
   ```

---

### Étape 2 : Démarrer le serveur Back-End

```bash
# 1. Aller dans le dossier back-end
cd taskflow-backend

# 2. Installer les dépendances
npm install

# 3. Créer le fichier .env (à partir du modèle)
cp .env.example .env
# Puis éditer .env si nécessaire (changer MONGO_URI pour Atlas)

# 4. Démarrer le serveur en mode développement (avec rechargement auto)
npm run dev

# OU en mode production
npm start
```

✅ Le serveur démarre sur **http://localhost:5000**

**Test rapide :** Ouvrez votre navigateur sur http://localhost:5000/api/ping
→ Vous devez voir : `{ "message": "Serveur TaskFlow operationnel" }`

---

### Étape 3 : Démarrer l'interface React (Front-End)

```bash
# 1. Aller dans le dossier front-end
cd taskflow-client

# 2. Installer les dépendances (si pas encore fait)
npm install

# 3. Démarrer le serveur de développement Vite
npm run dev
```

✅ L'interface s'ouvre sur **http://localhost:5173**

---

## 🌐 API — Référence des endpoints

| Méthode | URL              | Description                        | Body attendu              |
|---------|------------------|------------------------------------|---------------------------|
| GET     | `/api/ping`      | Test serveur                       | —                         |
| GET     | `/api/tasks`     | Récupérer toutes les tâches        | —                         |
| POST    | `/api/tasks`     | Créer une nouvelle tâche           | `{ title, description?, status? }` |
| PUT     | `/api/tasks/:id` | Mettre à jour le statut d'une tâche| `{ status }`              |
| DELETE  | `/api/tasks/:id` | Supprimer une tâche                | —                         |

### Exemples de requêtes (avec curl)

```bash
# Créer une tâche
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Finir le TP", "description": "Back-end Node.js", "status": "En cours"}'

# Récupérer toutes les tâches
curl http://localhost:5000/api/tasks

# Mettre à jour le statut
curl -X PUT http://localhost:5000/api/tasks/<ID> \
  -H "Content-Type: application/json" \
  -d '{"status": "Termine"}'

# Supprimer une tâche
curl -X DELETE http://localhost:5000/api/tasks/<ID>
```

---

## 🏗️ Architecture — Explication technique

### Architecture MVC (Modèle - Vue - Contrôleur)

```
Requête HTTP
     │
     ▼
server.js          ← Point d'entrée, configure middlewares
     │
     ▼
routes/            ← Définit QUOI faire (quelle URL → quel contrôleur)
taskRoutes.js
     │
     ▼
controllers/       ← Définit COMMENT faire (logique métier, accès BD)
taskController.js
     │
     ▼
models/            ← Définit LA STRUCTURE des données (schéma + validation)
Task.js
     │
     ▼
MongoDB            ← Base de données NoSQL
```

### Flux d'une requête POST (création de tâche)

1. React envoie `POST /api/tasks` avec `{ title: "Ma tâche" }`
2. Express reçoit la requête → `express.json()` parse le body
3. CORS vérifie que la requête vient de `http://localhost:5173` ✅
4. Le routeur `taskRoutes` reconnaît `POST /` → appelle `createTask()`
5. `createTask()` crée `new Task({ title: "Ma tâche" })` 
6. `.save()` déclenche la validation Mongoose → enregistre en MongoDB
7. Le contrôleur répond `201 Created` + l'objet tâche en JSON
8. React reçoit la réponse, vérifie `response.ok`, ajoute la tâche à l'état

---

## ⚙️ Variables d'environnement (.env)

| Variable     | Description                         | Valeur par défaut              |
|--------------|-------------------------------------|--------------------------------|
| `PORT`       | Port du serveur Express             | `5000`                         |
| `MONGO_URI`  | URL de connexion MongoDB            | `mongodb://localhost:27017/taskflow` |
| `CLIENT_URL` | URL du front-end React (pour CORS) | `http://localhost:5173`        |

---

## 📦 Dépendances

### Back-End
| Package    | Rôle                                            |
|------------|------------------------------------------------|
| `express`  | Framework web pour créer le serveur et les routes |
| `mongoose` | ODM pour MongoDB (schémas, validation, requêtes) |
| `cors`     | Middleware pour gérer les politiques CORS       |
| `dotenv`   | Chargement des variables d'environnement       |
| `nodemon`  | Rechargement automatique du serveur (dev)      |

---

## ✅ Barème — Vérification des Jalons

- [x] **Jalon 1** (3 pts) — Serveur Express sur port 5000, route `/api/ping`, variables `.env`
- [x] **Jalon 2** (4 pts) — Modèle Mongoose `Task` avec validations (title obligatoire, enum status, default)
- [x] **Jalon 3** (6 pts) — Architecture MVC, 4 fonctions contrôleur avec `try/catch`, routes REST
- [x] **Jalon 4** (3 pts) — `express.json()`, `cors()`, restriction CORS sur `CLIENT_URL` (+1 bonus)
- [x] **Jalon 5** (4 pts) — React sans localStorage, `useEffect` pour GET, POST conditionné au statut 201

// ─── Jalon 1 : Serveur Express ───────────────────────────────────────────────
require("dotenv").config(); // charge les variables du fichier .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes"); // Jalon 3

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Jalon 4 : Middlewares ────────────────────────────────────────────────────
// Permet de lire le corps JSON des requêtes POST/PUT
app.use(express.json());

// CORS restreint à l'URL du front-end React (Bonus +1 pt)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

// ─── Jalon 1 : Route de test ──────────────────────────────────────────────────
app.get("/api/ping", (req, res) => {
  res.json({ message: "Serveur TaskFlow operationnel" });
});

// ─── Jalon 3 : Routes des tâches avec préfixe /api/tasks ─────────────────────
app.use("/api/tasks", taskRoutes);

// ─── Jalon 2 : Connexion MongoDB puis démarrage du serveur ────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion MongoDB :", err.message);
    process.exit(1);
  });

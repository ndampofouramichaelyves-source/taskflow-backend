// ─── Jalon 3 : Routes RESTful ─────────────────────────────────────────────────
// Les routes ne contiennent AUCUNE logique métier, elles délèguent aux contrôleurs.
const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

// GET    /api/tasks       → liste toutes les tâches
router.get("/", getAllTasks);

// GET    /api/tasks/:id   → récupère une tâche par son ID
router.get("/:id", getTaskById);

// POST   /api/tasks       → crée une tâche
router.post("/", createTask);

// PUT    /api/tasks/:id   → met à jour le statut d'une tâche
router.put("/:id", updateTaskStatus);

// DELETE /api/tasks/:id   → supprime une tâche
router.delete("/:id", deleteTask);

module.exports = router;

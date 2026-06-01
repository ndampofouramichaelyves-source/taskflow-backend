// ─── Jalon 3 : Contrôleurs (architecture MVC) ────────────────────────────────
// La logique métier (accès BD) est SÉPARÉE des routes.
const Task = require("../models/Task");

// GET /api/tasks — Récupère toutes les tâches
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// POST /api/tasks — Crée une nouvelle tâche
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const newTask = new Task({ title, description, status });
    const savedTask = await newTask.save(); // déclenche les validations Mongoose

    res.status(201).json(savedTask); // 201 Created
  } catch (error) {
    // Erreur de validation Mongoose → 400 Bad Request
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Données invalides", error: error.message });
    }
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// PUT /api/tasks/:id — Met à jour uniquement le statut d'une tâche
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true } // runValidators applique l'enum sur la MAJ
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Tâche introuvable" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Statut invalide", error: error.message });
    }
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// DELETE /api/tasks/:id — Supprime une tâche
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Tâche introuvable" });
    }

    res.status(200).json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};



// GET /api/tasks/:id — Récupère une tâche par son ID (utilisé par TaskDetail)
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tâche introuvable" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTaskStatus, deleteTask };

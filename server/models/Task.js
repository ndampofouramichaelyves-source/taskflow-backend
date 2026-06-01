// ─── Jalon 2 : Modélisation NoSQL avec Mongoose ──────────────────────────────
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    // title : obligatoire, max 100 caractères
    title: {
      type: String,
      required: [true, "Le titre est obligatoire"],
      maxlength: [100, "Le titre ne peut pas dépasser 100 caractères"],
      trim: true,
    },

    // description : optionnelle
    description: {
      type: String,
      trim: true,
    },

    // status : doit appartenir à l'énumération, défaut 'A faire'
    status: {
      type: String,
      enum: {
        values: ["A faire", "En cours", "Termine"],
        message: "Le statut '{VALUE}' n'est pas valide",
      },
      default: "A faire",
    },
  },
  {
    // Ajoute automatiquement createdAt et updatedAt
    timestamps: true,
  }
);

// Export du modèle compilé
module.exports = mongoose.model("Task", taskSchema);

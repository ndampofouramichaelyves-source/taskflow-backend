// ============================================================
//  config/db.js — Configuration de la connexion MongoDB
//  On isole la logique de connexion dans un fichier séparé
//  pour garder server.js propre (principe de séparation des 
//  responsabilités).
// ============================================================

const mongoose = require('mongoose');

// Fonction asynchrone de connexion à MongoDB
const connectDB = async () => {
  try {
    // mongoose.connect() retourne une promesse
    // On attend la connexion avant de continuer
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`🗄️  MongoDB connecté : ${conn.connection.host}`);
  } catch (error) {
    // Si la connexion échoue, on affiche l'erreur et on arrête le processus
    console.error(`❌ Erreur de connexion MongoDB : ${error.message}`);
    process.exit(1); // Code 1 = arrêt avec erreur
  }
};

module.exports = connectDB;

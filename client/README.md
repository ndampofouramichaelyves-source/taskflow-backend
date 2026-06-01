# TaskFlow — Gestionnaire de tâches d'équipe

Application web de type Single Page Application (SPA) développée avec React et Vite.js dans le cadre du TP évalué d'Architecture Front-End.

## Fonctionnalités

- Affichage dynamique des tâches sous forme de cartes
- Ajout de nouvelles tâches via un formulaire contrôlé
- Navigation vers la fiche détaillée de chaque tâche
- Persistance des données dans le localStorage du navigateur
- Hook personnalisé `useLocalStorage` pour la gestion de l'état persistant

---

## Stack technique

- React 18
- Vite.js
- React Router DOM
- JavaScript pur (sans TypeScript)

---

## Installation et lancement

### Prérequis

- Node.js >= 18
- npm >= 9

### Étapes

```bash
# Cloner le dépôt
git clone https://github.com/ndampofouramichaelyves-source/bts-projet-web.git

# Aller dans le dossier du projet
cd bts-projet-web

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur http://localhost:5174

---

## Structure du projet

```
src/
├── components/
│   ├── TaskCard.jsx
│   └── TaskForm.jsx
├── pages/
│   ├── Dashboard.jsx
│   └── TaskDetail.jsx
├── layouts/
│   └── Navbar.jsx
├── hooks/
│   └── useLocalStorage.js
└── App.jsx
```

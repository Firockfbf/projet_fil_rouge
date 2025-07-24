// backend/src/routes/subscription.js

const express = require('express');
const router = express.Router();

// Assure-toi que ce chemin correspond bien à ton fichier :
const subscriptionController = require('../controllers/subscriptionController');

// GET  /api/subscriptions           → liste des abonnements de l’utilisateur
router.get('/', subscriptionController.getSubscriptions);

// POST /api/subscriptions/add       → ajouter un abonnement
router.post('/add', subscriptionController.addSubscription);

module.exports = router;

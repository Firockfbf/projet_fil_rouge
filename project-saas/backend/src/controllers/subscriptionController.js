// backend/src/controllers/subscriptionController.js

const jwt = require('jsonwebtoken');
const { Subscription } = require('../models');

// Assurez-vous que ça correspond à ce que vous utilisez dans authController
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_jwt';

module.exports = {
  // GET /api/subscriptions
  getSubscriptions: async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: 'Token manquant.' });
      }
      // Vérification de la signature et extraction de userId
      const { userId } = jwt.verify(token, JWT_SECRET);
      const subs = await Subscription.findAll({ where: { userId } });
      return res.json(subs);
    } catch (err) {
      console.error('❌ GET SUBS ERR', err);
      // Si token invalide ou expiré
      return res.status(401).json({ message: 'Authentification invalide.' });
    }
  },

  // POST /api/subscriptions/add
  addSubscription: async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: 'Token manquant.' });
      }
      const { userId } = jwt.verify(token, JWT_SECRET);
      const { serviceId } = req.body;
      // On crée ou incrémente si déjà existant
      const [sub, created] = await Subscription.findOrCreate({
        where: { userId, serviceId },
        defaults: { quantity: 1 },
      });
      if (!created) {
        sub.quantity += 1;
        await sub.save();
      }
      return res.status(201).json(sub);
    } catch (err) {
      console.error('❌ ADD SUB ERR', err);
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Authentification invalide.' });
      }
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
};

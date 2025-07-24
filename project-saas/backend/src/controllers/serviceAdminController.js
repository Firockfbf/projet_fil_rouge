// backend/src/controllers/serviceAdminController.js
const { Service } = require('../models');

module.exports = {
  // POST /api/services
  createService: async (req, res) => {
    try {
      const { name, description, price, imageUrl, category, details } = req.body;
      if (!name || !description || price == null || !category) {
        return res.status(400).json({ message: 'Champs manquants.' });
      }
      const service = await Service.create({
        name,
        description,
        price,
        imageUrl,
        category,
        details,
      });
      return res.status(201).json(service);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur serveur lors de la création.' });
    }
  },

  // PUT /api/services/:id
  updateService: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ message: 'Service introuvable.' });
      }
      const { name, description, price, imageUrl, category, details } = req.body;
      await service.update({
        name,
        description,
        price,
        imageUrl,
        category,
        details,
      });
      return res.json(service);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur serveur lors de la mise à jour.' });
    }
  },

  // DELETE /api/services/:id
  deleteService: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ message: 'Service introuvable.' });
      }
      await service.destroy();
      return res.json({ message: 'Service supprimé.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur serveur lors de la suppression.' });
    }
  },
};

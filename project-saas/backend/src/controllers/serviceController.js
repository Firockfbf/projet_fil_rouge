// backend/src/controllers/serviceController.js
const { Service } = require('../models');

// Votre liste statique complète, avec toutes les URLs d'images
const staticServices = [
  {
    id: 1,
    name: 'Service Cloud Storage',
    description: 'Stockage cloud sécurisé.',
    price: 5.99,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8l2KWfzcJ5lRu5Z1moyiEM4f6eSnQ58pu9HBJuix_quTaHlokVwZqoV5DyoH4XMm_mk0&usqp=CAU',
    category: 'Cloud',
    details: '100 Go de stockage, partage multi-appareils.',
  },
  {
    id: 2,
    name: 'Service Email Pro',
    description: 'Boîte pro domaine perso.',
    price: 9.99,
    imageUrl:
      'https://www.gataka.fr/wp-content/uploads/2016/04/boite-mail-gratuite.jpg',
    category: 'Email',
    details: '5 Go de stockage, antispam, antivirus.',
  },
  {
    id: 3,
    name: 'Service Analytics',
    description: 'Stats en temps réel.',
    price: 14.99,
    imageUrl:
      'https://www.centralcharts.com/medias/forum/graphique-analyse-technique-1.png',
    category: 'Analytics',
    details: 'Tableau de bord, rapports personnalisés.',
  },
  {
    id: 4,
    name: 'Service VPN Sécurisé',
    description: 'VPN privé partout.',
    price: 7.49,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbSPS9IsrdKJzyj_4WcwSFOcUCTHhbYj0EJQ&s',
    category: 'Sécurité',
    details: 'Serveurs dans 50 pays, cryptage AES-256.',
  },
];

module.exports = {
  // GET /api/services
  getAll: async (req, res) => {
    try {
      // 1) Si la table est vide, on sème TOUTES les entrées staticServices
      const count = await Service.count();
      if (count === 0) {
        await Service.bulkCreate(staticServices, { ignoreDuplicates: true });
      }

      // 2) Lire tous les services en base
      const services = await Service.findAll();
      const total = services.length;

      // 3) En-tête pour React-Admin
      res.set('Content-Range', `services 0-${total - 1}/${total}`);

      // 4) Répondre avec le tableau
      return res.json(services);
    } catch (err) {
      console.error('Erreur getAll services :', err);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
  },

  // GET /api/services/:id
  getById: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const service = await Service.findByPk(id);
      if (service) {
        return res.json(service);
      }
      // Fallback au statique si pas trouvé
      const fallback = staticServices.find((s) => s.id === id);
      if (fallback) {
        return res.json(fallback);
      }
      return res.status(404).json({ message: 'Service introuvable.' });
    } catch (err) {
      console.error('Erreur getById service :', err);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
  },
};

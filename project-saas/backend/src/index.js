// backend/src/index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize, Service } = require('./models');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const serviceRoutes = require('./routes/services');
const subscriptionRoutes = require('./routes/subscription');

const app = express();
const PORT = process.env.PORT || 4000;

// 1) Configurer CORS et exposer Content-Range
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    exposedHeaders: ['Content-Range'],
  })
);

// 2) Parser JSON & cookies
app.use(express.json());
app.use(cookieParser());

// 3) Monter les routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// 4) Données initiales à semer
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

// 5) Synchroniser la base, semer les services, puis démarrer le serveur
sequelize
  .sync()
  .then(async () => {
    console.log('✨ Database synced.');

    // Insère une seule fois vos services statiques
    await Service.bulkCreate(staticServices, { ignoreDuplicates: true });

    // Démarre le serveur Express
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB sync error:', err);
  });

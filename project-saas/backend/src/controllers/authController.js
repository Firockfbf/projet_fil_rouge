const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const { User } = require('../models');
const JWT_SECRET = 'dev_secret_jwt';

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: 'Email et mot de passe requis.' });
      if (await User.findOne({ where: { email } }))
        return res.status(400).json({ message: 'Email déjà utilisé.' });
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashed });
      return res.status(201).json({ message: 'Utilisateur créé.', userId: user.id });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: 'Email et mot de passe requis.' });
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ message: 'Identifiants invalides.' });
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 7*24*60*60*1000 });
      return res.json({ message: 'Connecté.' });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
  },
  logout: (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Déconnecté.' });
  }
};

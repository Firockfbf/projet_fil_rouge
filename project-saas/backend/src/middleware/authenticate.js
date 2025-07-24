// backend/src/middleware/authenticate.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'votre_secret_de_dev_pour_jwt';

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Pas de token' });

  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    req.userId = userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

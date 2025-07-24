const express = require('express');
const jwt     = require('jsonwebtoken');
const { User }= require('../models');
const r = express.Router();
const JWT_SECRET = 'dev_secret_jwt';

r.get('/me', async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message:'Non authentifié.' });
  let p; try { p=jwt.verify(token,JWT_SECRET); } catch { return res.status(401).json({ message:'Token invalide.' }); }
  const u = await User.findByPk(p.userId, { attributes:['id','email','createdAt'] });
  if (!u) return res.status(404).json({ message:'Utilisateur introuvable.' });
  res.json(u);
});

module.exports = r;

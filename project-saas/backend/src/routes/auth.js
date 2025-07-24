const express = require('express');
const c = require('../controllers/authController');
const r = express.Router();
r.post('/register', c.register);
r.post('/login',    c.login);
r.get ('/logout',   c.logout);
module.exports = r;

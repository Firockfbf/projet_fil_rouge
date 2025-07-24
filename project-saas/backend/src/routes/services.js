// backend/src/routes/services.js
const express = require('express');
const router = express.Router();
const {
  getAll,
  getById
} = require('../controllers/serviceController');
const {
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceAdminController');

// Lecture
router.get('/', getAll);
router.get('/:id', getById);

// Administration (CRUD)
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;

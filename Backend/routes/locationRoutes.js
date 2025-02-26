// routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const { updateUserLocation, getUserLocation } = require('../controllers/location');
const authMiddleware = require('../middleware/auth'); // Your authentication middleware

// Protected routes - require authentication
router.post('/update', authMiddleware, updateUserLocation);
router.get('/', authMiddleware, getUserLocation);

module.exports = router;
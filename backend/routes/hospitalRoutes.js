const express = require('express');
const router = express.Router();
const { getNearbyHospitals, getHospitalById } = require('../controllers/hospitalController');

// @route   GET /api/hospitals/nearby
// @desc    Get nearby hospitals based on lat and lng
router.get('/nearby', getNearbyHospitals);

// @route   GET /api/hospitals/:id
// @desc    Get hospital details by ID
router.get('/:id', getHospitalById);

module.exports = router;

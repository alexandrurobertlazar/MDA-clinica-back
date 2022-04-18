const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Controller
const TreatmentController = require('../controller/TreatmentController');

// Get all treatments
router.get('/', async (req, res) => {
    const treatments = await TreatmentController.getAllTreatments();
    res.send(treatments);
});

module.exports = router;
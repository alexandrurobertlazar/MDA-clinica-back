const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Controller
const PatientSpecialistController = require('../controller/PatientSpecialistController');

// Get all patientspecialists
router.get('/', async (req, res) => {
    const patientSpecialists = await PatientSpecialistController.getAllPatientSpecialist();
    res.send(patientSpecialists);
});

// Get all myPatients
router.get('/myPatients/:specialistId', async (req, res) => {
    const patientSpecialists = await PatientSpecialistController.getMyPatients(req.params.specialistId);
    res.send(patientSpecialists);
});

// Create patientspecialist
router.post('/', async (req, res) =>{
    const patientSpecialist = await PatientSpecialistController.createPatientSpecialist(req.body);
    res.send(patientSpecialist);
});

module.exports = router;
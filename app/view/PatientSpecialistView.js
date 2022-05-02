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

// Get all my specialists
router.get('/mySpecialists/:patient_id', async (req, res) => {
    const specialistList = await PatientSpecialistController.getMySpecialists(req.params.patient_id);
    if(!specialistList) {
        res.status(404);
        res.send({
            "error": "Algo ha ido mal, inténtelo más tarde"
        })
    } else {
        res.send(specialistList);
    }
});

// Create patientspecialist
router.post('/', async (req, res) =>{
    const patientSpecialist = await PatientSpecialistController.createPatientSpecialist(req.body);
    res.send(patientSpecialist);
});

// Specialsts assign on one patient
router.get('/names', async (req, res) =>{
    const patientSpecialist = await PatientSpecialistController.getName();
    if(!patientSpecialist) {
        res.status(404);
        res.send({"error": "No se ha podido encontrar la asignación"})
    } else {
        res.send(patientSpecialist);
    }
});

module.exports = router;
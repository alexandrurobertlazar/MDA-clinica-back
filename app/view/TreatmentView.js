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

//Create Treatment
router.post('/', async (req, res) =>{
    const treatment = await TreatmentController.createTreatment(req.body);
    res.send(treatment);
});

// Get treatent for one patient
router.get('/:id_patient', async (req, res) => {
    const treatment = await TreatmentController.getTreatmentPatient(req.params.id_patient);
    if(!treatment) {
        res.status(404);
        res.send({"error": "No se ha podido encontrar al tratamiento"})
    } else {
        res.send(treatment);
    }
});

// Get treatment by id
router.get('/treatment/:id', async (req, res) => {
    const treatment = await TreatmentController.getTreatmentById(req.params.id);
    if(!treatment) {
        res.status(404);
        res.send({"error": "No se ha podido encontrar el tratamiento"})
    } else {
        res.send(treatment);
    }
});

// Update treatment
router.put('/:treatmentId', async (req, res) => {
    const updatedTreatment = await TreatmentController.updateTreatment(req.body, req.params.treatmentId);
    if(!updatedTreatment) {
        res.status(422);
        res.send({ error: "No se ha podido actualizar al tratamiento"} );
    } else {
        res.send(updatedTreatment);
    }
});

module.exports = router;
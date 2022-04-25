const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const HistoryAuxController = require('../controller/HistoryAuxController');

// Create history patients
router.post('/', async (req, res) => {
    const historialList = await HistoryAuxController.createHistory(req.body);
    res.send(historialList);
});

// Get history patient
router.get('/:id_patient', async (req, res) => {
    const history = await HistoryAuxController.getHistoryByPatient(req.params.id_patient);
    if(!history){
        res.status(404);
        res.send({"error": "No se ha podido encontrar el historial"});
    } else {
        res.send(history);
    }
});

// Get history by id
router.get('/historyind/:historyId', async (req, res) => {
    const history = await HistoryAuxController.getHistoryById(req.params.historyId);
    if(!history) {
        res.status(404);
        res.send({"error": "No se ha podido encontrar el historial"})
    } else {
        res.send(history);
    }
});

// Update history
router.put('/:historyId', async (req, res) => {
    const updatedHistory = await HistoryAuxController.updateHistory(req.body, req.params.historyId);
    if(!updatedHistory) {
        res.status(422);
        res.send({ error: "No se ha podido actualizar el historial"} );
    } else {
        res.send(updatedHistory);
    }
});

module.exports = router;
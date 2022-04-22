const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const HistoryAuxController = require('../controller/HistoryAuxController');

// Create historial patients
router.post('/', async (req, res) =>{
    const historialList = await HistoryAuxController.createHistory(req.body);
    res.send(historialList);
});

module.exports = router;
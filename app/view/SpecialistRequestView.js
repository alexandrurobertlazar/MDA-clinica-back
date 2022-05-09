const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Controller
const SpecialistRequestController = require('../controller/SpecialistRequestController');

// Get request by id
router.get("/:request_id", async (req, res) => {
    const request = await SpecialistRequestController.getRequestById(req.params.request_id);
    if(!request) {
        res.status(404)
        res.send({
            "error": "Algo ha salido mal, inténtelo de nuevo más tarde"
        })
    } else {
        res.send(request);
    }
})

// Get all patient requests
router.get('/patient/:patient_id', async (req, res) => {
    const requests = await SpecialistRequestController.getAllUserRequest(req.params.patient_id)
    if(!requests) {
        res.status(404)
        res.send({
            "error": "Algo ha salido mal, inténtelo de nuevo más tarde"
        })
    } else {
        res.send(requests);
    }
});

// Get all specialists requests
router.get('/specialist/:specialist_id', async (req, res) => {
    const requests = await SpecialistRequestController.getAllSpecialistRequest(req.params.specialist_id)
    if(!requests) {
        res.status(404)
        res.send({
            "error": "Algo ha salido mal, inténtelo de nuevo más tarde"
        })
    } else {
        res.send(requests);
    }
})

router.post("/", async (req, res) => {
    const request = await SpecialistRequestController.addNewRequest(req.body);
    if(!request) {
        res.status(422)
        res.send({
            "error": "Algo ha salido mal, inténtelo de nuevo más tarde"
        })
    } else  {
        res.status(201)
        res.send(request);
    }
})

router.post("/accept", async (req, res) => {
    const { request_id } = req.body;
    const changed = await SpecialistRequestController.acceptRequest(request_id);
    if(!changed) {
        res.status(422)
        res.send({
            "error": "Algo ha salido mal, inténtelo de nuevo más tarde"
        })
    } else {
        res.status(201)
        res.send({
            "accepted": true
        })
    }
})

router.delete("/:request_id", async (req, res) => {
    const removed = await SpecialistRequestController.delteRequest(req.params.request_id);
    if(!removed) {
        res.status(422)
        res.send({
            "error": "Algo ha salido mal, inténtelo de nuevo más tarde"
        })
    } else {
        res.status(201)
        res.send({
            "removed": true
        })
    }
})

module.exports = router;
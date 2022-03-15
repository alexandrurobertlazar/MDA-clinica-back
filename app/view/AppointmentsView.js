const express = require('express');
const router = express.Router();
router.use(express.urlencoded({extended: true}));
router.use(express.json());

//Controller
const AppointmentController = require('../controller/AppointmentController');

//CRUD appointment router
router.get('/', async (req, res)=>{
    const appointments = await AppointmentController.getAllAppointments();
    res.send(appointments);
});

router.post('/', async (req, res) =>{
    const appointment = await AppointmentController.createAppointment(req.body);
    res.send(appointment);
});

module.exports = router;
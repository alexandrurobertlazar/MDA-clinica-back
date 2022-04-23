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

router.get('/:speId&:date', async (req, res)=>{
    const hours = await AppointmentController.getAvailableHour(req.params.speId, req.params.date);
    res.send(hours)
})

router.get('/:id', async (req, res) =>{
    const appointment = await AppointmentController.getAppointmentById(req.params.id);
    res.send(appointment);
});

router.get('/patient/:patId&:date', async (req, res)=>{
    const hours = await AppointmentController.getAvailableHourPatient(req.params.patId, req.params.date);
    res.send(hours)
});

router.get('/usr/:userId', async (req, res)=>{
    const appointments = await AppointmentController.getAllAppointmentsByPacId(req.params.userId);
    res.send(appointments);
});

router.get('/esp/:espId', async (req, res) =>{
    const appointments = await AppointmentController.getAllAppointmentsByEspId(req.params.espId);
    res.send(appointments);
});

router.post('/', async (req, res) =>{
    const appointment = await AppointmentController.createAppointment(req.body);
    res.send(appointment);
});

router.put('/:app_id', async (req, res)=>{
    const appointment = await AppointmentController.updateAppointment(req.body, req.params.app_id);
    res.send(appointment);
})

router.delete('/:userId', async (req, res) =>{
    const deleteAppointment= await AppointmentController.deleteAppointment(req.params.userId);
    res.send(deleteAppointment)
})



module.exports = router;
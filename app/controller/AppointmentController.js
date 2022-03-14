//Model
const Appointment = require('../model/Appointment');

async function getAllAppointments(){
    return await Appointment.find();
}

async function createAppointment(body){
    const req = new Appointment({
        title: body.title,
        pacient: body.pacient,
        especialist: body.especialist,
        date: body.date,
        desc: body.desc
    });
    req.save();
    const res = await Appointment.find({title: body.title});
    return res;
}

module.exports= {getAllAppointments, createAppointment};
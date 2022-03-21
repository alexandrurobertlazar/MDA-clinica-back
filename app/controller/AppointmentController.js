//Model
const Appointment = require('../model/Appointment');
const mongoose = require('mongoose');

const { appointmentHelper } = require('../helper/AppointmentHelper');

async function getAllAppointments(){
    const appointment_list = await Appointment.find();
    var apps = [];
    appointment_list.forEach(app =>{
        apps.push(appointmentHelper(app));
    })
    return apps;
}

async function getAllAppointmentsByPacId(id){
    let o_id = mongoose.Types.ObjectId(id);
    let filter = {"pacient": o_id};

    const appointment_list = await Appointment.find(filter);
    
    var apps = [];
    appointment_list.forEach(app =>{
        apps.push(appointmentHelper(app));
    })
    return apps;
}

async function getAllAppointmentsByEspId(id){
    let o_id = mongoose.Types.ObjectId(id);
    let filter = {"especialist": o_id};

    const appointment_list = await Appointment.find(filter);
    var apps = [];
    appointment_list.forEach(app =>{
        apps.push(appointmentHelper(app));
    })
    return apps;
}

//PROBLEMA: con la fecha que se pone en la base de datos
async function createAppointment(body){

    const req = new Appointment(body);
    req['date'] = new Date(body.date);

    let validationError = req.validateSync();
    if (validationError){
        return {"validationError" : validationError};
    }

    let id = await req.save();
    const createdAppointment = await Appointment.findById({_id: String(id['_id'])}).exec();
    return appointmentHelper(createdAppointment);
}

async function updateAppointment(body, id){
    
    let o_id= mongoose.Types.ObjectId(id.trim());

    const req = new Appointment({
        _id: o_id,
        title: body.title,
        pacient: body.pacient,
        especialist: body.especialist,
        date: convertFromStringToDate(body.date),
        desc: body.desc
    });
    let updatedAppointment = await Appointment.findOneAndUpdate({_id: o_id}, req, {new: true});
    return appointmentHelper(updatedAppointment);
}

async function deleteAppointment(id){
    try{
        let o_id = mongoose.Types.ObjectId(id.trim());
        let remove = await Appointment.findByIdAndDelete(o_id);
        return (remove !== null);
    } catch (error){
        console.log(error);
        return false;   
    }
}

module.exports= {getAllAppointments, getAllAppointmentsByPacId, getAllAppointmentsByEspId, createAppointment, 
    updateAppointment, deleteAppointment};
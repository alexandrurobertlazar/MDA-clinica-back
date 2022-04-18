//Model
const Appointment = require('../model/Appointment');
const mongoose = require('mongoose');

const { appointmentHelper } = require('../helper/AppointmentHelper');

async function getAppointmentById(id){
    try {
        let o_id = mongoose.Types.ObjectId(id);
        let filter = {"_id": o_id};
        const appointment = await Appointment.findOne(filter);
        return appointment;   
    } catch (error) {
        return false;
    }
}

async function getAllAppointments(){
    try {
        const appointment_list = await Appointment.find();
        var apps = [];
        appointment_list.forEach(app =>{
            apps.push(appointmentHelper(app));
        })
        return apps;   
    } catch (error) {
        return false;
    }
}

async function getAllAppointmentsByPacId(id){
    try {
        let o_id = mongoose.Types.ObjectId(id);
        let filter = {"patient": o_id};

        const appointment_list = await Appointment.find(filter);
        
        var apps = [];
        appointment_list.forEach(app =>{
            apps.push(appointmentHelper(app));
        })
        return apps;
    } catch (error) {
        return false;
    }
}

async function getAllAppointmentsByEspId(id){
    try {
        let o_id = mongoose.Types.ObjectId(id);
        let filter = {"specialist": o_id};
    
        const appointment_list = await Appointment.find(filter);
        var apps = [];
        appointment_list.forEach(app =>{
            apps.push(appointmentHelper(app));
        })
        return apps;   
    } catch (error) {
        return false;
    }
}

//PROBLEMA: con la fecha que se pone en la base de datos
async function createAppointment(body){
    try {
        const req = new Appointment(body);
        req['date'] = new Date(body.date);
    
        let validationError = req.validateSync();
        if (validationError){
            return {"validationError" : validationError};
        }
    
        let id = await req.save();
        const createdAppointment = await Appointment.findById({_id: String(id['_id'])}).exec();
        return appointmentHelper(createdAppointment);
    } catch (error) {
        return false;
    }
}

async function updateAppointment(body, id){
    try {
        let o_id= mongoose.Types.ObjectId(id.trim());

        const req = new Appointment({
            _id: o_id,
            title: body.title,
            patient: body.patient,
            specialist: body.specalist,
            date: body.date,
            desc: body.desc
        });
        let updatedAppointment = await Appointment.findOneAndUpdate({_id: o_id}, req, {new: true});
        return appointmentHelper(updatedAppointment);   
    } catch (error) {
        return false;
    }
}

async function deleteAppointment(id){
    try{
        let o_id = mongoose.Types.ObjectId(id.trim());
        let remove = await Appointment.findByIdAndDelete(o_id);
        return (remove !== null);
    } catch (error){
        return false;   
    }
}

module.exports= {getAllAppointments, getAppointmentById, getAllAppointmentsByPacId, getAllAppointmentsByEspId, createAppointment, 
    updateAppointment, deleteAppointment};

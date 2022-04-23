//Model
const Appointment = require('../model/Appointment');
const mongoose = require('mongoose');

const { appointmentHelper } = require('../helper/AppointmentHelper');

const appointmentsHours = setHours();

async function setHours(){
    let hoursArray = [];
    let hours=8;
    let minutes = 0;
    for(let i=0; i<53; i++){
        if(minutes==0){
            hoursArray[i]=hours+":00";
        } else{
            hoursArray[i]=hours+":"+minutes;
        }
        minutes+=15;
        if(minutes==60){
            hours++;
            minutes=0;
        }
    }
    return hoursArray;
}

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

async function createAppointment(body){
    try {
        const req = new Appointment(body);
    
        let validationError = req.validateSync();
        if (validationError){
            return {"validationError" : validationError};
        }
        
        let id = await req.save();
        const createdAppointment = await Appointment.findById({_id: String(id['_id'])}).exec();
        return appointmentHelper(createdAppointment);
    } catch (error) {
        console.log(error);
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
            specialist: body.specialist,
            date: body.date,
            hour: body.hour,
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

async function getAvailableHour(specialist, date){
    try{
        let appointmentsRaw = await getAllAppointmentsByEspId(specialist);
        let availableHours = await setHours();
        appointmentsRaw.forEach(app => {
            if(app.date === date){
                availableHours = availableHours.filter(i => i != app.hour);
            }
        });
        return availableHours;
    } catch(error){
        return false;
    }
}

async function getAvailableHourPatient(patient, date){
    try {
        let appointmentsRaw = await getAllAppointmentsByPacId(patient);
        let availableHours = await setHours();
        appointmentsRaw.forEach(app => {
            if(app.date === date){
                availableHours = availableHours.filter(i => i != app.hour);
            }
        });
        return availableHours;
    } catch(error) {
        return false;
    }
}

module.exports= { getAllAppointments, getAppointmentById, getAllAppointmentsByPacId, getAllAppointmentsByEspId, createAppointment, 
    updateAppointment, deleteAppointment, getAvailableHour, getAvailableHourPatient };

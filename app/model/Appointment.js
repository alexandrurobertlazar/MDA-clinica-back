const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserController = require('../controller/UserController');

const validateDate = function(date){
    let today = new Date(Date.now());
    if(Date.parse(date) <= Date.parse(today.toISOString())){
        return false;
    } else{
        return true;
    }
}

const validatePatient = async function(patient){
    const patientValidate = await UserController.getUserById(patient);
    if(patientValidate){
        if(patientValidate.role === "patient" ){
            return true;
        } 
        return false;
    } else{
        return false;
    }
}

const validateSpecialist = async function(specialist){
    const specialistValidate = await UserController.getUserById(specialist);
    if(specialistValidate){
        if(specialistValidate.role === "specialist" ){
            return true;
        } 
        return false;
    } else{
        return false;
    }
}

const AppointmentSchema = new Schema({
    title: {
        type : String,
        enum : [
            "Analitica",
            "Enfermeria",
            "Cita con medico"
        ],
        required: "El tipo de cita es obligatorio"
    },
    patient: {
        type: String,
        required: "El paciente es obligatorio",
        validate: [validatePatient, "No existe este paciente"]
    },
    specialist: {
        type: String,
        required: "El especialista es obligatorio",
        validate: [validateSpecialist, "No existe este especialista"]
    },
    date: {
        type : Date,
        validate: [validateDate, "Fecha incorrecta"],
        required: 'La fecha es obligatoria'
    },
    desc: {
        type : String,
        trim: true,
        required: 'La descripción es obligatoria',
        minlength: [5, 'La descripción es muy corta']
    }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
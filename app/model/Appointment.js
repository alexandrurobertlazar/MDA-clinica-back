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

const validatePacient = async function(pacient){
    const pacientValidate = await UserController.getUserById(pacient);
    if(pacientValidate){
        if(pacientValidate.role === "paciente" ){
            return true;
        } 
        return false;
    } else{
        return false;
    }
}

const validateEspecialist = async function(especialist){
    const especialistValidate = await UserController.getUserById(especialist);
    if(especialistValidate){
        if(especialistValidate.role === "especialista" ){
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
    pacient: {
        type: String,
        required: "El paciente es obligatorio",
        validate: [validatePacient, "No existe este paciente"]
    },
    especialist: {
        type: String,
        required: "El especialista es obligatorio",
        validate: [validateEspecialist, "No existe este especialista"]
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
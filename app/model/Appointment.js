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

const validateHour = async function(hourData){
    const [hour, min] = hourData.split(':');
    return ((parseInt(hour)>=8 && parseInt(hour)<=21) && (min==="00" || min==="15" || min==="30" || min==="45"));
}


const validatePacient = async function(pacient){
    const pacientValidate = await UserController.getUserById(pacient);
    if(pacientValidate){
        if(pacientValidate.role === "patient" ){
            return true;
        } 
        return false;
    } else{
        return false;
    }
}

const validateEspecialist = async function(specialist){
    const especialistValidate = await UserController.getUserById(specialist);
    if(especialistValidate){
        if(especialistValidate.role === "specialist" ){
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
        validate: [validatePacient, "No existe este paciente"]
    },
    specialist: {
        type: String,
        required: "El especialista es obligatorio",
        validate: [validateEspecialist, "No existe este especialista"]
    },
    date: {
        type : String,
        validate: [validateDate, "Fecha incorrecta"],
        required: 'La fecha es obligatoria'
    },
    hour:{
        type: String,
        validate: [validateHour, "Hora incorrecta"],
        required: 'La hora es obligatoria'
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
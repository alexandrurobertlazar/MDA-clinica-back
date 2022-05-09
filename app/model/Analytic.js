const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserController = require('../controller/UserController');

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

const validateDate = function(date){
    let today = new Date(Date.now());
    if(Date.parse(date) > Date.parse(today.toISOString())){
        return false;
    } else{
        return true;
    }
}

const AnalyticSchema = new Schema({
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
    desc: {
        type : String,
        trim: true,
        required: 'La descripción es obligatoria',
        minlength: [5, 'La descripción es muy corta']
    }
});

const Analytic = mongoose.model('Analytic', AnalyticSchema);

module.exports = Analytic;
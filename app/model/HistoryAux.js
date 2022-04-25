const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserController = require('../controller/UserController');

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

const HistoryAuxSchema = new Schema({
    id_patient: {
        type: String,
        requited: 'El paciente es obligatorio',
        validate: [validatePatient, 'No existe este paciente']
    },
  
    id_specialist: {
        type: String,
        required: 'El especialista es obligatorio',
        validate: [validateSpecialist, 'No existe este especialista']
    },
    subject: {
        type: String,
        trim: true,
        required: 'El asunto es obligatorio',
        minlength: [5, 'El asunto es muy corto'],
        maxlength: [20, 'El asunto es demasiado largo']    
    },
    description: {
        type: String,
        trim: true,
        required: 'La descripción es obligatoria',
        minlength: [10, 'La descripción es muy corta'],
        maxlength: [50, 'La descripción es demasidada larga']
    }
});

const HistoryAux = mongoose.model('HistoryAux', HistoryAuxSchema);

module.exports = HistoryAux;
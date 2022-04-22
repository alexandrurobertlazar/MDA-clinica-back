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

const PatientSpecialistSchema = new Schema({

    id_patient: {
        type: String,
        required: 'El paciente es obligatorio',
        validate: [validatePatient, "No existe este paciente"]
    },
    
    id_specialist: {
        type: String,
        required: 'El especialista es obligatorio',
        validate: [validateSpecialist, "No existe este especialista"] 
    }
});

const PatientSpecialist = mongoose.model('PatientSpecialist', PatientSpecialistSchema);

module.exports = PatientSpecialist;
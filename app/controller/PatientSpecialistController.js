const mongoose = require('mongoose');

// Model
const PatientSpecialist = require('../model/PatientSpecialist');

// Helper
const { patientSpecialistHelper } = require('../helper/PatientSpecialistHelper');

// Controller
const UserController = require('./UserController');


async function getAllPatientSpecialist() {
    const patientSpecialistList = await PatientSpecialist.find();
    
    var patientSpecialists = [];
    patientSpecialistList.forEach(patientSpecialist => {
        patientSpecialists.push(patientSpecialistHelper(patientSpecialist));
    });
    
    return patientSpecialists;
}

async function createPatientSpecialist(patientSpecialistData) {

    try {
        const req = new PatientSpecialist(patientSpecialistData);
    
        let validationError = req.validateSync();
        if (validationError){
            return {"validationError" : validationError};
        }
    
        let id = await req.save();
        const createPatientSpecialist = await PatientSpecialist.findById({_id: String(id['_id'])}).exec();
        return patientSpecialistHelper(createPatientSpecialist);
    } catch (error) {
        return false;
    }
}

async function getMyPatients(id_specialist){
    try {
        //const patientsSpecialistList = await getAllPatientSpecialist();
        const myPatient = await PatientSpecialist.find({"id_specialist": id_specialist}).exec();
       
        var myPatients = [];
        myPatient.forEach(patient =>{
            myPatients.push(patient.id_patient);
        });
        
        var info = [];
        for (patient of myPatients) {
            const infoPatients = await UserController.getUserById(patient);
            info.push(infoPatients);
        }
        return info;
    } catch (error) {
        return;
    }
}

module.exports = { getAllPatientSpecialist, createPatientSpecialist, getMyPatients};

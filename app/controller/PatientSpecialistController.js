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

async function getMySpecialists(patient_id) {
    try {
        let o_id = mongoose.Types.ObjectId(patient_id);
        const specialistList = await PatientSpecialist.find({"id_patient": o_id}).exec()
        
        if(specialistList.length <= 0) {
            return false;
        }

        var mySpecialists = [];
        for(let specialist of specialistList) {
            let specialistInfo = await UserController.getUserById(specialist.id_specialist);
            if(specialistInfo) {
                mySpecialists.push(specialistInfo);
            }
        }
        if(mySpecialists.length > 0) {
            return mySpecialists;
        } else {
            return false;
        }
    } catch(error) {
        return false
    }
}

module.exports = { getAllPatientSpecialist, createPatientSpecialist, getMyPatients, getMySpecialists };

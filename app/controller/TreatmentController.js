const mongoose = require('mongoose');

// Model
const Treatment = require('../model/Treatment');

// Helper
const { treatmentHelper } = require('../helper/TreatmentHelper');

async function getAllTreatments() {
    const treatmentList = await Treatment.find();
    
    var treatments = [];
    treatmentList.forEach(treatment => {
        treatments.push(treatmentHelper(treatment));
    });
    
    return treatments;
}

async function getTreatmentById(id) {
    try {
        let o_id = mongoose.Types.ObjectId(id);
        const treatment = await Treatment.findById(o_id).exec();
        console.log(treatment);
        return treatmentHelper(treatment);
    } catch (error) {
        console.log("OLA");
        return;
    }
}

async function getTreatmentPatient(id_patient) {
    try {
        const treatment = await Treatment.find({"id_patient": id_patient}).exec();
        return treatment;
    } catch (error) {
        return;
    }
}

async function createTreatment(treatmentData) {

    try {
        const req = new Treatment(treatmentData);
    
        let validationError = req.validateSync();
        if (validationError){
            return {"validationError" : validationError};
        }
    
        let id = await req.save();
        const createTreatment = await Treatment.findById({_id: String(id['_id'])}).exec();
        return treatmentHelper(createTreatment);
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function updateTreatment(treatmentData, treatmentId) {
    try {
        let o_id = mongoose.Types.ObjectId(treatmentId);
        let treatment = new Treatment({
            _id: o_id,
            ...treatmentData
        });

        let validationError = treatment.validateSync();
        if(validationError) {
            return false;
        }
        let updatedTreatment = await Treatment.findOneAndUpdate({'_id': o_id}, treatment, {returnOriginal: false});
        return treatmentHelper(updatedTreatment);
    } catch (error) {
        return false;
    }
}

module.exports = { getAllTreatments, createTreatment, getTreatmentPatient, getTreatmentById, updateTreatment};

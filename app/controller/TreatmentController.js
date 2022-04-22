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

module.exports = { getAllTreatments, createTreatment};

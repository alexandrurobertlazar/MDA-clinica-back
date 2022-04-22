const mongoose = require('mongoose');

//Model
const Historyaux = require('../model/HistoryAux');

// Helper
const { historyAuxHelper} = require('../helper/HistoryAuxHelper');
const HistoryAux = require('../model/HistoryAux');


// Create historial patients
async function createHistory (historyData) {

    try {
        const req = new Historyaux(historyData);
    
        let validationError = req.validateSync();
        if (validationError){
            return {"validationError" : validationError};
        }
    
        let id = await req.save();
        const createHistory = await Historyaux.findById({_id: String(id['_id'])}).exec();
        return historyAuxHelper(createHistory);
    } catch (error) {
        return false;
    }
}

// Get history by patient
async function getHistoryByPatient(id_patient){
    try {
        const history = await Historyaux.find({"id_patient": id_patient}).exec();
        return history;
    } catch(error) {
        return;
    }
}

// Get history by id
async function getHistoryById(historyId) {
    try {
        let o_id = mongoose.Types.ObjectId(historyId);
        const history = await Historyaux.findById(o_id).exec();
        return historyAuxHelper(history);
    } catch (error) {
        return;
    }
}

// Update history
async function updateHistory(historyData, historyId) {
    try {
        let o_id = mongoose.Types.ObjectId(historyId);
        
        let history = new HistoryAux({
            _id: o_id,
            ...historyData
        });

        let validationError = history.validateSync();
        if(validationError) {
            return false;
        }
        
        let updatedHistory = await HistoryAux.findOneAndUpdate({'_id': o_id}, history, {returnOriginal: false});
        return historyAuxHelper(updatedHistory);
    } catch (error) {
        return false;
    }
}

module.exports = { createHistory, getHistoryByPatient, getHistoryById, updateHistory };

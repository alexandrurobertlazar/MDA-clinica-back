const mongoose = require('mongoose');

//Model
const Historyaux = require('../model/HistoryAux');

// Helper
const { historyAuxHelper} = require('../helper/HistoryAuxHelper');
const HistoryAux = require('../model/HistoryAux');
const UserController = require ('../controller/UserController');

// Create historial patients
async function createHistory (historyData) {

    try {
        const req = new Historyaux(historyData);
    
        let validationError = req.validateSync();
        if (validationError){
            return {"validationError" : validationError};
        }
    
        let id = await req.save();
        const createHistory = await Historyaux.findById({_id: id['_id']}).exec();
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

// Get history by id_patient and get name of sanitary
async function getName(id_patient) {
    try {
        var relation = [];
        const historyPatient = await getHistoryByPatient(id_patient);
      
        var specialists = [];
        for (specialist of historyPatient) {
            const name_specialist = await UserController.getUserById(specialist.id_specialist);
            specialists.push(name_specialist.name);
        } 

        for(all of historyPatient){
            relation.push({"subject":`${all.subject}`, "description":`${all.description}`, "name": ""});
        }

        for(var j=0;j<specialists.length;j++){
            relation[j].name = specialists[j];
        }

        return relation;
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

module.exports = { createHistory, getHistoryByPatient, getHistoryById, getName, updateHistory };

const mongoose = require('mongoose');

//Model
const Historyaux = require('../model/HistoryAux');

// Helper
const { historyAuxHelper} = require('../helper/HistoryAuxHelper');

// Create historial patients
async function createHistory (historyData) {

    try {
        const req = new Historyaux(historyData);
    
        let validationError = req.validateSync();
        if (validationError){
            console.log("sii pu");
            return {"validationError" : validationError};
        }
    
        let id = await req.save();
        const createHistory = await Historyaux.findById({_id: String(id['_id'])}).exec();
        return historyAuxHelper(createHistory);
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = { createHistory };

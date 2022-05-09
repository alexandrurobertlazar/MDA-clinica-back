//Model
const Analytic = require('../model/Analytic');
const mongoose = require('mongoose');

const { analyticsHelper } = require('../helper/AnalyticsHelper');


async function getAllAnalytics(){
    try {
        const analytics_list = await Analytic.find();
        var apps = [];
        analytics_list.forEach(app =>{
            apps.push(analyticsHelper(app));
        })
        return apps;   
    } catch (error) {
        return false;
    }
}

async function getAnalyticById(id){
    try {
        let o_id = mongoose.Types.ObjectId(id);
        let filter = {"_id": o_id};
        const analytic = await Analytic.findOne(filter);
        return analytic;   
    } catch (error) {
        return false;
    }
}

async function getAllAnalyticsByEspId(id){
    try {
        let o_id = mongoose.Types.ObjectId(id);
        let filter = {"specialist": o_id};
    
        const analytics_list = await Analytic.find(filter);
        var apps = [];
        analytics_list.forEach(app =>{
            apps.push(analyticsHelper(app));
        })
        return apps;   
    } catch (error) {
        return false;
    }
}


async function createAnalytic(body){
    try{
        const req = new Analytic(body);
        let validationError = req.validateSync();
        if (validationError){
            return {"validationError" : validationError};
        }
        let id = await req.save();
        const createdAnalytic = await Analytic.findById({_id: String(id['_id'])}).exec();
        return analyticsHelper(createdAnalytic);
    } catch(error){
        return false;
    }
}

async function updateAnalytic(body, id){
    try {
        let o_id= mongoose.Types.ObjectId(id.trim());
        const req = new Analytic({
            _id: o_id,
            patient: body.patient,
            specialist: body.specialist,
            date: body.date,
            desc: body.desc
        });
        let validationError = req.validateSync();
        if (validationError){
            return {"validationError" : validationError};
        }
        let updatedAnalytic = await Analytic.findOneAndUpdate({_id: o_id}, req, {new: true});
        return analyticsHelper(updatedAnalytic);   
    } catch (error) {
        return false;
    }
}

async function deleteAnalyticById(id){
    try{
        let o_id = mongoose.Types.ObjectId(id.trim());
        let remove = await Analytic.findByIdAndDelete(o_id);
        return (remove !== null);
    } catch (error){
        return false;   
    }
}

module.exports={getAllAnalytics,getAnalyticById,getAllAnalyticsByEspId,createAnalytic,updateAnalytic,deleteAnalyticById};
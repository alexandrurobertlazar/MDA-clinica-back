const mongoose = require('mongoose');

// Model
const SpecialistRequest = require('../model/SpecialistRequest');
const User = require('../model/User');

// Helper
const { specialistRequestHelper } = require('../helper/SpecialistRequestHelper');
const { userHelper } = require('../helper/UserHelper');


// Get all patient's specialist change request
async function getAllUserRequest(patient_id) {
    try {
        let o_id = mongoose.Types.ObjectId(patient_id)
        let filter = {"patient_id": o_id}
        const requests = await SpecialistRequest.find(filter).exec()

        var list = []
        if(requests.length > 0) {
            let patient = await User.findById(o_id);
            for(let r of requests) {
                let specialist = await User.findById(mongoose.Types.ObjectId(r.specialist_id)).exec();
                if(specialist && patient) {
                    list.push(specialistRequestHelper(userHelper(patient), userHelper(specialist), r));
                }
            }
        } else {
            return false;
        }
        return list;
    } catch (error) {
        return false;
    }
}

// Get all specialist's change request
async function getAllSpecialistRequest(specialist_id) {
    try {
        let o_id = mongoose.Types.ObjectId(specialist_id)
        let filter = {"specialist_id": o_id}
        const requests = await SpecialistRequest.find(filter).exec()

        var list = []
        if(requests.length > 0) {
            let specialist = await User.findById(o_id);
            for(let r of requests) {
                let patient = await User.findById(mongoose.Types.ObjectId(r.patient_id)).exec();
                if(specialist && patient) {
                    list.push(specialistRequestHelper(userHelper(patient), userHelper(specialist), r));
                }
            }
        } else {
            return false;
        }
        return list;
    } catch (error) {
        return false;
    }
}

async function getRequestById(request_id) {
    try {
        let o_id = mongoose.Types.ObjectId(request_id)
        const request = await SpecialistRequest.findById(o_id).exec()
        if(request) {
            let specialist = await User.findById(mongoose.Types.ObjectId(request.specialist_id)).exec()
            let patient = await User.findById(mongoose.Types.ObjectId(request.patient_id)).exec()
            if(patient && specialist) {
                return specialistRequestHelper(userHelper(patient), userHelper(specialist), request);
            }
        } else {
            return false;
        }
    } catch(error) {
        return false
    }
}

async function addNewRequest(request) {
    try {
        const newRequest = new SpecialistRequest(request)

        let validationError = newRequest.validateSync()
        if(validationError) {
            return false
        }

        let saveError = false;
        let id = await newRequest.save()
        .catch(err => saveError = err)
        if(saveError) {
            return false;
        }

        const createdRequest = await getRequestById(id._id);
        return createdRequest;
    } catch (error) {
        return false
    }
}

module.exports = { getAllUserRequest, getRequestById, addNewRequest, getAllSpecialistRequest }
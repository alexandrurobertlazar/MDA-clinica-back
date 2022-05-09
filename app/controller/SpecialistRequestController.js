const mongoose = require('mongoose');

// Model
const SpecialistRequest = require('../model/SpecialistRequest');

// Helper
const { specialistRequestHelper } = require('../helper/SpecialistRequestHelper');
const { createPatientSpecialist, deleteRelation } = require('./PatientSpecialistController');
const { getUserById } = require('./UserController');


// Get all patient's specialist change request
async function getAllUserRequest(patient_id) {
    try {
        let o_id = mongoose.Types.ObjectId(patient_id)
        let filter = {"patient_id": o_id}
        const requests = await SpecialistRequest.find(filter).exec()

        var list = []
        if(requests.length > 0) {
            let patient = await getUserById(o_id)
            for(let r of requests) {
                let specialist = await getUserById(r.specialist_id);
                let old_specialist = await getUserById(r.old_specialist);
                if(old_specialist && specialist && patient) {
                    list.push(specialistRequestHelper(patient, specialist, old_specialist, r));
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
            let specialist = await getUserById(o_id);
            for(let r of requests) {
                let patient = await getUserById(r.patient_id)
                let old_specialist = await getUserById(r.old_specialist);
                if(old_specialist && specialist && patient) {
                    list.push(specialistRequestHelper(patient, specialist, old_specialist, r));
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
            let specialist = await getUserById(request.specialist_id)
            let patient = await getUserById(request.patient_id)
            let old_specialist = await getUserById(request.old_specialist)
            if(patient && specialist && old_specialist) {
                    return specialistRequestHelper(patient, specialist, old_specialist, request)
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

async function acceptRequest(request_id) {
    try {
        let o_id = mongoose.Types.ObjectId(request_id)
        const request = await SpecialistRequest.findById(o_id)
        if(request) {
            const relation = {
                id_patient: request.patient_id,
                id_specialist: request.specialist_id
            }
            const created = await createPatientSpecialist(relation);
            if(created) {
                const removed = await deleteRelation(relation.id_patient, request.old_specialist);
                if(removed) {
                    const requestRemoved = await SpecialistRequest.findOneAndDelete({"_id": o_id})
                    return true;
                } else {
                    return false
                }
            }
        } else {
            return false
        }
    } catch(error) {
        return false
    }
    return false
}

async function delteRequest(request_id) {
    try {
        let o_id = mongoose.Types.ObjectId(request_id)
        const removed = await SpecialistRequest.findByIdAndRemove(o_id)
        if(removed) {
            return true
        } 
        return false
    } catch(error) {
        return false
    }
}

module.exports = { getAllUserRequest, getRequestById, addNewRequest, getAllSpecialistRequest, acceptRequest, delteRequest }
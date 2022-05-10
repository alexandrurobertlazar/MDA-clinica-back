
function specialistRequestHelper(patient, specialist, old_specialist, request) {
    return {
        id: request._id,
        reason: request.reason,
        patient: patient,
        specialist: specialist,
        old_specialist: old_specialist
    }
}

module.exports = { specialistRequestHelper }
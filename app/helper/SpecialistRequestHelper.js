
function specialistRequestHelper(patient, specialist, request) {
    return {
        id: request._id,
        reason: request.reason,
        patient: patient,
        specialist: specialist
    }
}

module.exports = { specialistRequestHelper }
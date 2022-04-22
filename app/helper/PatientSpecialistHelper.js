
function patientSpecialistHelper(patientSpecialist) {
    return {
        "id": patientSpecialist._id,
        "id_patient": patientSpecialist.id_patient,
        "id_specialist": patientSpecialist.id_specialist,
    }
}

module.exports = { patientSpecialistHelper };
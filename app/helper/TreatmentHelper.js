
function treatmentHelper(treatment) {
    return {
        "id": treatment._id,
        "id_patient": treatment.id_patient,
        "id_specialist": treatment.id_specialist,
        "subject": treatment.subject,
        "description": treatment.description
    }
}

module.exports = { treatmentHelper };
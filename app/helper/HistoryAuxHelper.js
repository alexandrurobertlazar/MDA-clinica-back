
function historyAuxHelper(history_aux) {
    return {
        "id": history_aux._id,
        "id_patient": history_aux.id_patient,
        "id_specialist": history_aux.id_specialist,
        "subject": history_aux.subject,
        "description": history_aux.description
    }
}

module.exports = { historyAuxHelper };
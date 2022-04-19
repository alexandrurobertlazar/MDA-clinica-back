function appointmentHelper(appointment) {
    return {
        "id": appointment._id,
        "title": appointment.title,
        "patient": appointment.patient,
        "specialist": appointment.specialist,
        "date": appointment.date,
        "hour": appointment.hour,
        "desc": appointment.desc
    }
}

module.exports = { appointmentHelper };
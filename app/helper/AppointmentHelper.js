function appointmentHelper(appointment) {
    return {
        "id": appointment._id,
        "title": appointment.title,
        "pacient": appointment.pacient,
        "especialist": appointment.especialist,
        "date": appointment.date,
        "desc": appointment.desc
    }
}

module.exports = { appointmentHelper };
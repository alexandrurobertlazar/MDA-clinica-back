const mongoose = require('mongoose');
const { Schema } = mongoose;

const Citas = {
    "analitica" : "Analítica",
    "enfermeria" : "Enfermería",
    "citaG" : "Cita con médico"
};

const AppointmentSchema = new Schema({
    title: {
        type : String,
        enum : [
            "Analitica",
            "Enfermeria",
            "Cita con medico"
        ]
    },
    pacient: String,
    especialist: String,
    date: Date,
    desc: String
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);



module.exports = Appointment;
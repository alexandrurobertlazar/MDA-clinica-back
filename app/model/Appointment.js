const mongoose = require('mongoose');
const { Schema } = mongoose;


//esperar al CRUD de usuarios para cambiar las String de paciente 
//y especialista por ids de usuarios del sistema
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
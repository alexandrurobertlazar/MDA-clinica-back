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
    desc: {
        type : String,
        trim: true,
        required: 'La descripción es obligatoria',
        minlength: [5, 'La descripción es muy corta']
    }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
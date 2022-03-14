const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
    title: String,
    pacient: String,
    especialist: String,
    date: Date,
    desc: String
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
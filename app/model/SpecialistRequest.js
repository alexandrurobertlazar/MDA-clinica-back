const mongoose = require('mongoose');
const { Schema } = mongoose;


const SpecialistRequestSchema = new Schema({
    patient_id: {
        type: String,
        trim: true,
        required: 'El id del paciente es obligatorio'
    },
    specialist_id: {
        type: String,
        trim: true,
        required: 'El id del especialista es obligatorio'
    },
    reason: {
        type: String, 
        trim: true,
        required: false,
        maxlength: [200, 'La razón debe ser más corta']
    }
});

const SpecialistRequest = mongoose.model('SpecialistRequest', SpecialistRequestSchema);

module.exports = SpecialistRequest;
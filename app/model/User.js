const mongoose = require('mongoose');
const { Schema } = mongoose;


const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'El nombre es obligatorio',
        minlength: [3, 'El nombre es muy corto']
    },
    email: {
        type: String, 
        trim: true,
        lowercase: true,
        unique: true,
        required: 'El email es necesario',
        validate: [validateEmail, 'Email no valido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email no válido']
    },
    phone: {
        type: String,
        trim: true,
        required: 'El telefono es obligatorio',
    },
    password: {
        type: String,
        trim: true,
        required: 'La contraseña es obligatoria',
        minlength: [5, 'La contraseña es demasiado corta']
    },
    role: {
        type: String,
        required: 'Elija un rol para el usuario'
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
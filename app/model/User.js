const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    role: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
/**
 * Fields:
 * Name
 * Email
 * Phone number
 * Password
 * Role
 */

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

exports.User = User;
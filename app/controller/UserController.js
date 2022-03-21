const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Model
const User = require('../model/User');

// Helper
const { userHelper } = require('../helper/UserHelper');

async function getAllUsers() {
    const usersList = await User.find();
    
    var users = [];
    usersList.forEach(user => {
        users.push(userHelper(user));
    });

    return users;
}

async function getUserById(userId) {
    try {
        let o_id = mongoose.Types.ObjectId(userId);
        const user = await User.findById(o_id).exec();
        return userHelper(user);
    } catch (error) {
        return;
    }
}

async function createUser(userData) {
    userData.password = bcrypt.hashSync(userData.password, 8);
    const newUser = new User(userData);

    let validationError = newUser.validateSync();
    if(validationError) {
        return { "validationError" : validationError };
    }

    let saveError = undefined;
    await newUser.save()
    .catch((err) => saveError = err);
    if(saveError) {
        return { "error": "El email ya existe" };
    }

    const createdUser = await User.findOne({email: userData.email}).exec();
    return userHelper(createdUser);
}

async function updateUser(userData, userId) {
    try {
        let o_id = mongoose.Types.ObjectId(userId);
        
        userData.password = bcrypt.hashSync(userData.password, 8);
        let user = new User({
            _id: o_id,
            ...userData
        });

        let validationError = user.validateSync();
        if(validationError) {
            return false;
        }
        
        let updatedUser = await User.findOneAndUpdate({'_id': o_id}, user, {returnOriginal: false});
        return userHelper(updatedUser);
    } catch (error) {
        return false;
    }
}

async function deleteUser(userId) {
    try {
        let o_id = mongoose.Types.ObjectId(userId);
        let removed = await User.findByIdAndDelete(o_id);
        return (removed !== null);
    } catch (error) {
        return false;
    }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
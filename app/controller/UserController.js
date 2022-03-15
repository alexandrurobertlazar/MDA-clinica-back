// Model
const User = require('../model/User');

async function getAllUsers() {
    return await User.find();
}

async function createUser(userData) {
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
    return createdUser;
}

module.exports = { getAllUsers, createUser };
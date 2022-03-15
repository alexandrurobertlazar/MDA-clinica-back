// Model
const User = require('../model/User');

async function getAllUsers() {
    return await User.find();
}

async function createUser(userData) {
    const newUser = new User(userData);

    let validationError = newUser.validateSync();
    if(validationError) return validationError;

    await newUser.save((err) => {
        if(err) console.error(err);
    });

    const createdUser = await User.findOne({email: userData.email}).exec();
    return createdUser;
}

module.exports = { getAllUsers, createUser };
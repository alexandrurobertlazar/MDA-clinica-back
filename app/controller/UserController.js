// Model
const User = require('../model/User');

async function getAllUsers() {
    return await User.find();
}

async function createUser(userData) {
    const newUser = new User({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        role: userData.role
    });
    newUser.save((err) => {
        if(err) console.error(err);
    });
    const createdUser = await User.find({name: userData.email})
    return createdUser;
}

module.exports = { getAllUsers, createUser };